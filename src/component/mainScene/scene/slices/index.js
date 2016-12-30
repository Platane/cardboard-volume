const THREE = require('util/three')

import buildSlices          from './buildSlices'
import prepareAnimation     from './prepareAnimation'

module.exports = ( store, scene, renderer, camera ) => {

    const container = new THREE.Object3D()
    container.name  = 'slicesContainer'
    scene.add( container )

    const mat       = new THREE.MeshPhongMaterial({
        color       : 0xFCEBB6,
        // emissive    : 0x123345,
        shininess   : 4,
    })

    let meshes = []

    let lastSlices
    let lastK   = -1
    const unsubscribe = store.subscribe( () => {

        // create meshes
        {
            const slices = store.getState()['cut.slices']

            if ( slices != lastSlices ) {

                while( container.children[0] )
                    container.remove( container.children[0] )

                lastSlices = slices

                meshes.length = 0

                if ( !slices )
                    return

                meshes.push( ...buildSlices( slices, 0.5, mat ) )

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
            }
        }

    })

    return unsubscribe
}