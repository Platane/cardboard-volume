import object           from '../../object'
import base             from './base/complete'

const THREE = require('util/three')

const dot = ( a, b ) =>
    THREE.Vector3.prototype.dot.call( a, b )

const stepWidth = ( action, boundingBox, base, previousStepWidth, _boundingBox ) => {

    if ( action.type == 'cut:stepWidth:set' )
        return {
            u   : action.payload.u,
            v   : action.payload.v,
        }

    if ( boundingBox == _boundingBox )
        return previousStepWidth

    if ( boundingBox )
        return {
            u : ( dot( base.u, boundingBox.max ) - dot( base.u, boundingBox.min ) )/ 6.5,
            v : ( dot( base.v, boundingBox.max ) - dot( base.v, boundingBox.min ) )/ 6.5,
        }

    else
        return null
}

stepWidth.source       = true
stepWidth.dependencies = [ object.boundingBox, base ]

module.exports         = stepWidth
