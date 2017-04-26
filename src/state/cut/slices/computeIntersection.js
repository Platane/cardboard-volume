import intersectionSegmentLine      from 'util/math/line/intersection/segmentLine'

const THREE = require('util/three')

const project = ( m, p ) =>
    p
        .clone()
        .applyMatrix4( m )

// intersection with hull and a line
const hullLineIntersection = ( hull, o, v ) => {

    const i = { min: Infinity, max: -Infinity }

    // go througth each edge of the hull, looking for intersection with the line
    for( let a=hull.length; a--; )
    {
        const b = (a+1)%hull.length

        const res = intersectionSegmentLine( hull[a], hull[b], o, v )

        // if there is an intersection
        // hold the k value ( o + v * k in the intersection point )
        if ( res ) {
            i.min = Math.min( res.k2, i.min )
            i.max = Math.max( res.k2, i.max )
        }
    }

    return isFinite( i.min )
        ? i
        : null
}


// structure is
// grid[ u ][ v ] = { min, max }
// where u is the index of the u position
//       v is the index of the v position
//
const computeGrid = ( slices, base, positions ) => {

    const grid = []

    slices.u.forEach( ( _, u ) => {

        grid[ u ] = []

        slices.v.forEach( ( { P, _P, shapes }, v ) => {


            // cut the v shapes
            // ( the shapes on plan diriged by v vector )

            // // compute the base inside the v plan
            // compute the vector which cut the plan u and v
            // project it in the v plan
            const vy    = project( _P, base.h ).sub( project( _P, new THREE.Vector3(0,0,0) ) )

            // also project u in the v plan
            const vx    = project( _P, base.u ).sub( project( _P, new THREE.Vector3(0,0,0) ) )

            const o = new THREE.Vector2()
               .set( 0,0 )
               .addScaledVector( vx, positions.u[ u ] )

            // for each hull of the shape
            grid[ u ][ v ] = shapes.reduce(
                (largest, { hull }) => {
                    const res = hullLineIntersection( hull, o, vy )

                    if ( !res )
                        return largest

                    if ( !largest )
                        return res

                    return {
                        max : Math.max( res.max, largest.max ),
                        min : Math.min( res.min, largest.min ),
                    }
                },
                null
            )

        })
    })

    return grid
}

module.exports  = computeGrid
