import object           from '../../object'
import base             from './base/complete'

const THREE = require('util/three')

const dot = ( a, b ) =>
    THREE.Vector3.prototype.dot.call( a, b )

const origin = ( action, boundingBox, base, previousOrigin, _boundingBox ) => {

    if ( action.type == 'cut:origin:set' )
        return {
            u   : action.payload.u,
            v   : action.payload.v,
        }

    if ( boundingBox == _boundingBox )
        return previousOrigin

    if ( boundingBox )
        return {
            u : ( dot( base.u, boundingBox.min ) + dot( base.u, boundingBox.max ) )/ 2,
            v : ( dot( base.v, boundingBox.min ) + dot( base.v, boundingBox.max ) )/ 2,

            // h : ( dot( base.h, boundingBox.min ) + dot( base.h, boundingBox.max ) )/ 2,
        }

    else
        return null
}

origin.source       = true
origin.dependencies = [ object.boundingBox, base ]

module.exports      = origin
