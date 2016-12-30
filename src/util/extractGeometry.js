const THREE     = require('util/three')
require('three/examples/js/loaders/OBJLoader')

module.exports = objRaw => {

    const mesh      = ( new THREE.OBJLoader ).parse( objRaw ).children[0]

    const geometry  = new THREE.Geometry().fromBufferGeometry( mesh.geometry )

    return geometry
}