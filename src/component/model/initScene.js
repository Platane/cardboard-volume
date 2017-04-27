const THREE = require('util/three')

const initScene = () => {

    const camera    = new THREE.PerspectiveCamera( 90, 1, 0.01, 3000 )

    const scene     = new THREE.Scene()

    const renderer  = new THREE.WebGLRenderer({ alpha: true, antialiasing: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(window.devicePixelRatio)

    window.scene    = scene
    window.THREE    = THREE

    // add light
    let light1
    let light2
    {
        light1 = new THREE.PointLight( 0xFCEBB6, 2, 100 )
        scene.add( light1 )

        scene.add( new THREE.PointLightHelper( light1, 1 ) )


        light2 = new THREE.PointLight( 0x78C0A8, 2, 100 )
        scene.add( light2 )

        scene.add( new THREE.PointLightHelper( light2, 1 ) )
    }

    // add gizmo
    {
        // const axisHelper = new THREE.AxisHelper( 5 )
        // axisHelper.name = 'axis'
        // scene.add( axisHelper )
    }

    let container
    {
        container = new THREE.Object3D
        scene.add( container )
        container.name = 'container'
    }

    const setSize =  ( width, height ) => {

        camera.aspect = width / height
        camera.updateProjectionMatrix ()

        renderer.setSize(width, height)
    }

    const render = () =>
        renderer.render(scene, camera)

    let mesh = null
    const setGeometry = geometry => {

        while( container.children[0] )
            container.remove( container.children[0] )

        if ( !geometry )
            return

        const mat       = new THREE.MeshPhongMaterial({
            color       : 0x5E412F,
            emissive    : 0x302210,
            specular    : 0x937676,
            shininess   : 4,
            // wireframe   : true,
        })

        mesh      = new THREE.Mesh( geometry, mat )

        container.add( mesh )

        if ( !geometry.boundingSphere )
            geometry.computeBoundingSphere()

        const r = geometry.boundingSphere.radius
        const c = geometry.boundingSphere.center

        camera.lookAt( c )
        camera.position.copy( c )
        camera.position.addScaledVector( (new THREE.Vector3(5,1,-4)).normalize(), r * 1.5 )
        camera.updateProjectionMatrix ()

        light1.position.copy( c )
        light1.position.addScaledVector( (new THREE.Vector3(4,1,2)).normalize(), r * 1.3 )

        light2.position.copy( c )
        light2.position.addScaledVector( (new THREE.Vector3(4,3,-5)).normalize(), r * 1.3 )
    }


    let killLoop
    {
        let cancelAnimation
        killLoop = () => cancelAnimationFrame( cancelAnimation )

        let k=0

        const loop = () => {

            k ++

            if ( mesh ) {
                mesh.rotation.x = 0.2+Math.sin( k * 0.017 ) * 0.1
                mesh.rotation.z = Math.sin( k * 0.01 ) * 0.1
                mesh.rotation.y = Math.sin( k * 0.013 + 24 ) * 0.2
                mesh.matrixWorldNeedsUpdate = true

                render()
            }


            cancelAnimation = requestAnimationFrame( loop )
        }
        loop()
    }

    return {
        setSize,
        setGeometry,
        render,
        destroy   : () => {
            killLoop()
        },
        getCanvas : () =>
            renderer.domElement
        ,
    }
}

module.exports = initScene