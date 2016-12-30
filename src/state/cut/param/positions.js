import origin       from './origin'
import stepWidth    from './stepWidth'
import base         from './base/complete'
import object       from '../../object'
const THREE = require('util/three')

const dot = ( a, b ) =>
    THREE.Vector3.prototype.dot.call( a, b )

const slice = ( origin, w, min, max ) => {
    const a = Math.floor( ( origin - min ) / w )
    const b = Math.floor( ( max - origin ) / w )

    const arr = []

    for ( let i=-a; i<=b; i ++ )
        arr.push( origin + i * w )

    return arr
}

const positions = ( base, origin, stepWidth, boundingBox ) =>
    boundingBox
        ? {
            u : slice( origin.u, stepWidth.u, dot( base.u, boundingBox.min ), dot( base.u, boundingBox.max ) ),
            v : slice( origin.v, stepWidth.v, dot( base.v, boundingBox.min ), dot( base.v, boundingBox.max ) ),
        }
        : null


positions.stateless     = true
positions.dependencies  = [ base, origin, stepWidth, object.boundingBox ]
module.exports = positions
