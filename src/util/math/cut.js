const THREE = require('three')

const epsylon = 0.0001

// A and B two point
// return P such as P = A + k ( AB ) and P is in the plan
const proj = ( plan, A, B ) => {

    const den = plan.x * ( B.x - A.x ) + plan.y * ( B.y - A.y ) + plan.z * ( B.z - A.z )

    if ( Math.abs(den) < epsylon )
        return null

    const k = - ( plan.d + A.x * plan.x + A.y * plan.y + A.z * plan.z ) / den

    return new THREE.Vector3(
        A.x +  ( B.x - A.x ) * k,
        A.y +  ( B.y - A.y ) * k,
        A.z +  ( B.z - A.z ) * k,
    )
}

// cut a volume along the plan
// a point p is in the plan <=> plan as plan.x * p.x + plan.y * p.y + plan.z * p.z + plan.d = 0
// return an array of polygon
const cut = ( vertices, faces, plan ) => {

    const edges = []

    // find edge with one point on each side
    for( let i =faces.length; i--; ){

        // side for each point
        const a = vertices[ faces[i].a ].dot( plan ) + plan.d > 0
        const b = vertices[ faces[i].b ].dot( plan ) + plan.d > 0
        const c = vertices[ faces[i].c ].dot( plan ) + plan.d > 0

        if ( a != b && a != c )
            edges.push([
                proj( plan, vertices[ faces[i].a ], vertices[ faces[i].b ] ),
                proj( plan, vertices[ faces[i].a ], vertices[ faces[i].c ] )
            ])

        else if ( a != b && b != c )
            edges.push([
                proj( plan, vertices[ faces[i].a ], vertices[ faces[i].b ] ),
                proj( plan, vertices[ faces[i].b ], vertices[ faces[i].c ] )
            ])

        else if ( a != c && b != c )
            edges.push([
                proj( plan, vertices[ faces[i].a ], vertices[ faces[i].c ] ),
                proj( plan, vertices[ faces[i].b ], vertices[ faces[i].c ] )
            ])
    }

    // link edges
    const hulls = []

    while( edges.length ){

        let a
        let i

        const [ start, end ] = edges.shift()
        const hull = [ a = start ]

        while( edges.length ){

            // if a is the end, stop
            // we have a closed hull
            if ( a.distanceToSquared( end ) < epsylon )
                break

            // fund the next vertice of the hull
            // ( the one that share an edge with a )
            for( i=edges.length; i--; ){

                if ( a.distanceToSquared( edges[i][0] ) < epsylon ){

                    hull.push( a = edges.splice(i,1)[0][1] )
                    break

                } else if ( a.distanceToSquared( edges[i][1] ) < epsylon ){

                    hull.push( a = edges.splice(i,1)[0][0] )
                    break
                }
            }

            // cannot find such vertice
            if ( i<0 )
                throw 'invalid hull'
        }

        hull.length > 1 && hulls.push( hull )
    }

    return hulls
}


module.exports = cut
