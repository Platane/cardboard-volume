const THREE = require('util/three')

import buildSlices          from './buildSlices'
import prepareAnimation     from './prepareAnimation'
import {generateLightMap}   from './lightmap'

const texture_cardboard_path = require('../../../../asset/texture/cardboard.jpg')
const texture_side_path = require('../../../../asset/texture/side.jpg')


const createMat = () => {

    const { image, update } = generateLightMap()
    const map_ao = new THREE.Texture(image)
    map_ao.needsUpdate = true
    map_ao.wrapT = THREE.ClampToEdgeWrapping
    map_ao.wrapS = THREE.MirroredRepeatWrapping
    map_ao.repeat.set( 1, 1 )

    const map_cardboard = (new THREE.TextureLoader()).load( texture_cardboard_path )
    map_cardboard.wrapS = map_cardboard.wrapT = THREE.MirroredRepeatWrapping
    map_cardboard.repeat.set( 1, 1 )

    const map_side = (new THREE.TextureLoader()).load( texture_side_path )
    map_side.wrapS = map_side.wrapT = THREE.MirroredRepeatWrapping
    map_side.repeat.set( 1, 1 )

    const mat_cardboard = new THREE.MeshPhongMaterial({
        specular        : 0x111111,
        emissive        : 0x111111,
        shininess       : 0.4,

        color           : 0x5E412F,
        emissive        : 0x302210,
        specular        : 0x937676,

        // map             : map_cardboard,
        //
        bumpMap         : map_cardboard,
        bumpScale       : 0.08,

        aoMap           : map_ao,
        aoMapIntensity  : 3,
    })
    const mat_side       = new THREE.MeshPhongMaterial({
        specular        : 0x111111,
        emissive        : 0x111111,
        shininess       : 0.4,

        map             : map_side,

        bumpMap         : map_side,
        bumpScale       : 0.3,

        aoMap           : map_ao,
        aoMapIntensity  : 3,
    })

    return {
        mat                     : [ mat_cardboard, mat_side ],
        updateAOmap             : (u, v) => {
            update(u, v)
            map_ao.needsUpdate = true
        },
        updateAOmapIntensity    : k => {
            mat_cardboard.aoMapIntensity = k
            mat_side.aoMapIntensity = k
        },
    }
}


module.exports = ( store, scene, renderer, camera ) => {

    const container = new THREE.Object3D()
    container.name  = 'slicesContainer'
    scene.add( container )

    const {mat, updateAOmap, updateAOmapIntensity} = createMat()

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

                const shadow_length = boundingSphere.radius / 3

                while( container.children[0] )
                    container.remove( container.children[0] )

                lastSlices = slices

                meshes.length = 0

                if ( !slices )
                    return

                updateAOmap( shadow_length/stepWidth.u, shadow_length/stepWidth.v )

                meshes.push( ...buildSlices( slices, origin, stepWidth, 0.5, mat ) )

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

                updateAOmapIntensity( Math.max( (k - 0.95)/0.05, 0 ) * 1.8 )
            }
        }

    })

    return unsubscribe
}