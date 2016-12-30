import u    from './u'
import v    from './v'


const THREE = require('util/three')


const h = ( u, v ) =>
    ( new THREE.Vector3() ).crossVectors( u, v )

h.dependencies = [ u, v ]

module.exports  = h
