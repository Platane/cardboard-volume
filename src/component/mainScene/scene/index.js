const THREE = require('util/three')

const plugins = [
    require('./orbitCamera'),
    require('./static'),
    require('./wrap'),
    require('./slices'),
]

const initScene = ( store ) => {

    const camera    = new THREE.PerspectiveCamera( 50, 1, 0.01, 3000 )
    camera.position.set( -100, 60, -140 )
    camera.lookAt( new THREE.Vector3(0,0,0) )
    camera.updateProjectionMatrix ()

    const scene     = new THREE.Scene()

    const renderer  = new THREE.WebGLRenderer({ alpha: true, antialiasing: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.renderReverseSided = false
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    window.scene    = scene
    window.THREE    = THREE

    // init all plugins
    // as all plugins should return a destroy function, warp all the destroy into a global one
    const destroy   = plugins
        .reduce( (chain,init ) => {
            const destroy = init( store, scene, renderer, camera )

            return destroy
                ? () => { chain(); destroy() }
                : chain

        },() =>0 )

    // add gizmo
    {
        const axisHelper = new THREE.AxisHelper( 5 )
        axisHelper.name = 'axis'
        scene.add( axisHelper )
    }

    const setSize =  ( width, height ) => {

        camera.aspect = width / height
        camera.updateProjectionMatrix ()

        renderer.setSize(width, height)
    }

    const render = () =>
        renderer.render(scene, camera)


    let killLoop
    {
        let cancelAnimation
        killLoop = () => cancelAnimationFrame( cancelAnimation )

        const loop = () => {

            render()

            cancelAnimation = requestAnimationFrame( loop )
        }
        loop()
    }

    return {
        setSize,
        render,
        destroy   : () => {
            destroy()
            killLoop()
        },
        getCanvas : () =>
            renderer.domElement
        ,
    }
}

module.exports = initScene