import intersection                     from '../../line/intersection/segmentSegment'
import pointInside                      from '../pointInside'
import setOrientation                   from '../orientation/set'

const epsylon = 0.00001

// push a segment from a to b from source into target
// consider source as circular
const pushSegment = ( target, source, a, b ) => {

    a = a % source.length
    b = b % source.length

    const _a = Math.floor( a )
    const _b = Math.floor( b )

    if ( a < b ) {

        if ( _a < _b )
            target.push(
               ...source.slice( _a+1, _b+1 ),
            )

    } else {

        target.push(
            ...source.slice( _a+1 ),
            ...source.slice( 0, _b+1 ),
        )
    }
}

// considering the segment from a to b
const insideCircularInterval = ( a, b, e ) =>
    a < b
        ? a <= e && e <= b
        : e <= a || e >= b

// compute A - B
module.exports = ( hullA, hullB ) => {

    // fix orientation
    hullA = setOrientation( hullA.slice() )
    hullB = setOrientation( hullB.slice(), false )

    // get all the point for which the two hull intersect
    let i = []

    for( let a=hullA.length; a--; )
    for( let b=hullB.length; b--; )
    {
        const a_ = ( a+1 ) % hullA.length
        const b_ = ( b+1 ) % hullB.length

        const P = intersection( hullA[a], hullA[a_], hullB[b], hullB[b_] )

        P && i.push({ P, a: a+P.k1, b: b+P.k2 })
    }

    // eliminate point that are too close
    i = i
        .sort( (u,v) => u.a > v.a ? 1 : -1 )
        .filter( (x,i,arr) => i == 0 || Math.abs( arr[i-1].a - arr[i].a ) > epsylon )

    // degenerate case with no intersection
    if ( i.length == 0 )
        return pointInside( hullB, hullA[ 0 ] )
            ? [ ]
            : [ hullA ]

    const hulls = []

    while( i.length ) {

        const hull  = []


        // select a point of A which is outside of B
        // and which is not already in another hull
        let s = 0
        while( s < hullA.length && ( hulls.some( hull => hull.some( u => hullA[ s ] == u ) ) || pointInside( hullB, hullA[ s ] ) ) )
            s ++

        if ( s >= hullA.length )
            // seems like A is inside B
            // but intersection point remains
            // ?
            throw new Error('invalid hull')

        let side        = 'a'
        let hull_side   = hullA
        let e           = s

        let k = 100
        while( k -- > 0 ){

            // next intersection
            let next = i.reduce( ( next, x, i ) => {

                const next_e = x[ side ]

                const d = ( next_e - e + hull_side.length ) % hull_side.length

                return next && next.d < d
                    ? next
                    : {
                        d,
                        i,
                        next_e,
                        ...x,
                    }

            }, null)

            // test if next close the hull
            // => if the starting point s is in [ e, next_e ]
            if ( next && side == 'a' && s != e && insideCircularInterval( e, next.next_e, s ) )
                next = null

            if ( !next ) {
                // finish
                // close the hull

                if ( side != 'a' )
                    // problem
                    // if we started on A, we should finish on A
                    throw new Error('invalid hull')

                pushSegment( hull, hullA, e, s )

                break
            }

            // remove from the list of intersection
            i.splice( next.i, 1 )

            // complete from e to the intersection
            pushSegment( hull, hull_side, e, next.next_e )

            // add the intersection point
            hull.push( next.P )

            // loop
            if( side == 'a' ) {

                e = next.b
                side = 'b'
                hull_side = hullB

            } else {

                e = next.a
                side = 'a'
                hull_side = hullA

            }

        }

        hulls.push( hull )
    }

    return hulls
}