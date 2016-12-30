const THREE = require('three')
import {intersection} from '../point'

const epsylon = 0.00001

const o     = new THREE.Vector2()
const v     = new THREE.Vector2()
const ab    = new THREE.Vector2()
const an    = new THREE.Vector2()

const det   = ( a, b ) =>
    a.x * b.y - a.y * b.x

// a is inside the polygon
//  <=>  any vector that comes from a must cross the hull k * 2 + 1 times
//  <=>  a vector that cross the hull at least once must cross it k * 2 + 1 times
module.exports = ( polygon, u ) => {

    // pick a vector which cross the hull at least once
    // ( take the vector from the point p to a point on an adge of the hull )

    // avoid taking an edge which the point is on,
    // to avoid dealing with numerical imprecision

    let k = -1
    do {

        k ++

        ab.subVectors( polygon[ k ], polygon[ k+1 ] )
        an.subVectors( polygon[ k ], u )

    } while( Math.abs( det( ab, an ) ) < epsylon )

    o.lerpVectors( polygon[ k ], polygon[ k+1 ], 0.5 )

    v.subVectors( o, u )

    let cross = 0

    for( let k=polygon.length; k --;){

        const a = polygon[ (k+1) % polygon.length ]
        const b = polygon[ k ]

        ab.subVectors( b, a )

        const ab_length = ab.length()

        ab.x /= ab_length
        ab.y /= ab_length

        const n = intersection( a, ab, u, v )

        if ( n ){
            an.subVectors( n, a )

            const k = an.subVectors( n, a ).dot( ab )

            if ( -epsylon < k && k < ab_length + epsylon ) {

                const k = an.subVectors( n, u ).dot( v )

                if ( k > -epsylon )
                    cross ++

            }
        }
    }

    return cross % 2 == 1
}