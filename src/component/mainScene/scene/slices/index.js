const THREE = require('util/three')

import buildSlices          from './buildSlices'
import prepareAnimation     from './prepareAnimation'
import {generateLightMap}   from './lightmap'

const texture_path = require('../../../../asset/texture/cardboard.jpg')
const texture_side_path = require('../../../../asset/texture/side.jpg')

module.exports = ( store, scene, renderer, camera ) => {

    const container = new THREE.Object3D()
    container.name  = 'slicesContainer'
    scene.add( container )

    const x = generateLightMap()
    const map = new THREE.Texture(x.image)
    const updateTexture = x.update
    map.needsUpdate = true
    // map.wrapS = map.wrapT = THREE.RepeatWrapping
    // map.wrapS = map.wrapT = THREE.ClampToEdgeWrapping
    map.wrapT = THREE.ClampToEdgeWrapping
    map.wrapS = THREE.MirroredRepeatWrapping
    map.repeat.set( 1, 1 )

    const map2 = (new THREE.TextureLoader()).load( texture_path )
    map2.wrapS = map2.wrapT = THREE.MirroredRepeatWrapping
    map.repeat.set( 1, 1 )

    const mapSide = (new THREE.TextureLoader()).load( texture_side_path )
    mapSide.wrapS = mapSide.wrapT = THREE.MirroredRepeatWrapping
    mapSide.repeat.set( 1, 1 )

    const mat       = new THREE.MeshPhongMaterial({
        // wireframe   : true,

        // color           : 0x2194ce,
        specular        : 0x111111,
        emissive        : 0x111111,
        shininess       : 0.4,


        map             : map2,

        bumpMap         : map2,
        bumpScale       : 0.3,

        // displacementMap : map2,
        // displacementScale  : 1,
        // displacementOffset : -1,

        aoMap           : map,
        aoMapIntensity  : 1,
    })
    const matSide       = new THREE.MeshPhongMaterial({
        // wireframe   : true,

        // color           : 0x2194ce,
        specular        : 0x111111,
        emissive        : 0x111111,
        shininess       : 0.4,


        map             : mapSide,

        bumpMap         : mapSide,
        bumpScale       : 0.3,

        aoMap           : map,
        aoMapIntensity  : 1,
    })

    let meshes = []

    let lastSlices
    let lastK   = -1
    const unsubscribe = store.subscribe( () => {

        // create meshes
        {
            const slices = store.getState()['cut.slices']

            if ( slices != lastSlices ) {

                const origin    = store.getState()['cut.param.origin']
                const stepWidth = store.getState()['cut.param.stepWidth']
                const boundingSphere = store.getState()['object.boundingSphere']

                const shadow_length = boundingSphere.radius / 6

                while( container.children[0] )
                    container.remove( container.children[0] )

                lastSlices = slices

                meshes.length = 0

                if ( !slices )
                    return

                updateTexture( shadow_length/stepWidth.u, shadow_length/stepWidth.v )
                map.needsUpdate = true

                meshes.push( ...buildSlices( slices, origin, stepWidth, 0.5, [ mat, matSide ] ) )

                const count = {
                    u   : slices.u.length,
                    v   : slices.v.length,
                }

                meshes.forEach( ({ mesh }) => container.add( mesh ) )

                meshes.forEach( x => x.animate = prepareAnimation( count, x ) )

                lastK = -1
            }
        }

        // control animation
        {
            const k = store.getState()['timeline.k']

            if ( k != lastK ) {

                lastK = k

                meshes.forEach( x =>
                    x.animate( k )
                )

                mat.aoMapIntensity = Math.max( (k - 0.95)/0.05, 0 ) * 2.5
            }
        }

    })

    return unsubscribe
}