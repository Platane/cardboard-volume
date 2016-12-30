const THREE         = require('util/three')
require('three/examples/js/controls/OrbitControls')

module.exports = ( store, scene, renderer, camera ) => {

    const controls          = new THREE.OrbitControls( camera , renderer.domElement )
    controls.enableZoom     = true
    controls.enablePan      = true
    controls.minDistance    = 1
    controls.maxDistance    = 170
    controls.addEventListener( 'change', () => 0 )
}