const THREE = require('three')
import base from './base/fromPoints'

module.exports = ( vertices, origin ) => {

    const m = base(
        origin || vertices[ 0 ],
        vertices[ Math.floor( vertices.length*1/3 ) ],
        vertices[ Math.floor( vertices.length*2/3 ) ]
    )

    const flatVertices = vertices
        .map( p => {

            const a = p.toArray()

            m.P.applyToVector3Array( a )

            return ( new THREE.Vector2() ).fromArray( a )

        })

    return { ...m, flatVertices }
}
