import geometry      from './geometry'
const THREE = require('util/three')

const boundingSphere = ( geometry ) => {

    if ( !geometry )
        return null

    if ( !geometry.boundingSphere )
        geometry.computeBoundingSphere()

    return {
        center : ( new THREE.Vector3() ).copy( geometry.boundingSphere.center ),
        radius : geometry.boundingSphere.radius,
    }
}
boundingSphere.dependencies = [ geometry ]
boundingSphere.stateless    = true

module.exports = boundingSphere
