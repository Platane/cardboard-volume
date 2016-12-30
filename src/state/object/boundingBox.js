import geometry      from './geometry'
const THREE = require('util/three')

const boundingBox = ( geometry ) => {

    if ( !geometry )
        return null

    if ( !geometry.boundingBox )
        geometry.computeBoundingBox()

    return {
        min : ( new THREE.Vector3() ).copy( geometry.boundingBox.min ),
        max : ( new THREE.Vector3() ).copy( geometry.boundingBox.max ),
    }
}
boundingBox.dependencies = [ geometry ]
boundingBox.stateless    = true

module.exports = boundingBox
