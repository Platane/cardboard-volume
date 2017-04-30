const THREE = require('util/three')


module.exports = ( store, scene, renderer, camera ) => {

    // shameless rip from
    // https://github.com/mrdoob/three.js/blob/master/examples/webgl_lights_hemisphere.html
    scene.fog = new THREE.Fog( 0xffffff, 1, 2000 )
    scene.fog.color.setHSL( 0.6, 0, 1 )

    // LIGHTS
    {
        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 )
        hemiLight.color.setHSL( 0.6, 1, 0.6 )
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 )
        hemiLight.position.set( 0, 500, 0 )
        hemiLight.name= 'hemilight'
        scene.add( hemiLight )


        {
            const light = new THREE.PointLight( 0xFCEBB6, 1.4, 100 )
            light.position.set(
                -40,
                10,
                60
            )
            scene.add( light )

            scene.add( new THREE.PointLightHelper( light, 1 ) )
        }

        {
            const light = new THREE.PointLight( 0x78C0A8, 1.4, 100 )
            light.position.set(
                40,
                10,
                -60
            )
            scene.add( light )

            scene.add( new THREE.PointLightHelper( light, 1 ) )
        }

        //
        const dirLight = new THREE.DirectionalLight( 0xffffff, 1 )
        dirLight.color.setHSL( 0.1, 1, 0.95 )
        dirLight.position.set( -1, 1.75, 1 )
        dirLight.position.multiplyScalar( 5 )
        dirLight.castShadow = true
        dirLight.shadow.mapSize.width = 1024
        dirLight.shadow.mapSize.height = 1024
        dirLight.name= 'dirLight'
        const d = 50
        dirLight.shadow.camera.left = -d
        dirLight.shadow.camera.right = d
        dirLight.shadow.camera.top = d
        dirLight.shadow.camera.bottom = -d
        dirLight.shadow.camera.far = 3500
        dirLight.shadow.bias = -0.0001

        scene.add( dirLight )
    }

    // GROUND
    {
        const groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 )
        const groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } )
        groundMat.color.setHSL( 0.095, 1, 0.75 )
        const ground = new THREE.Mesh( groundGeo, groundMat )
        ground.rotation.x = -Math.PI/2
        ground.position.y = -60
        ground.receiveShadow = true
        ground.name = 'ground'
        scene.add( ground )
    }

    // SKYDOME
    {
        const skyGeo = new THREE.SphereGeometry( 1000, 32, 15 )
        const skyMat = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x050505, side: THREE.BackSide })
        const sky = new THREE.Mesh( skyGeo, skyMat )
        sky.name = 'sky'
        scene.add( sky )
    }

}