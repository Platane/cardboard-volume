const THREE = require('util/three')


module.exports = ( store, scene, renderer, camera ) => {

    const container = new THREE.Object3D()
    container.name  = 'objectWrapContainer'
    scene.add( container )

    const mat       = new THREE.MeshPhongMaterial({
        color       : 0x503210,
        emissive    : 0x302210,
        specular    : 0x937676,
        shininess   : 4,
        opacity     : 0.5,
        transparent : true,
        wireframe   : true,
        // side        : THREE.DoubleSide,
    })


    let mesh

    let lastGeometry
    const unsubscribe = store.subscribe( () => {

        const geometry = store.getState()['object.geometry']
        const visible  = !true

        if ( geometry != lastGeometry ) {

            lastGeometry = geometry

            while( container.children[0] )
                container.remove( container.children[0] )

            if ( geometry )
                container.add( mesh = new THREE.Mesh( geometry, mat ) )

        }

        if ( mesh )
            mesh.visible = visible
    })

    return unsubscribe
}