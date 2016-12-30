import pointInside      from './polygon/pointInside'
import setOrientation   from 'util/math/polygon/orientation/set'

// return { n, i }
// where n is the number of polygon which contain i
//  ( i is the root polygon for n = 0 )
const rootContainer = ( containers, i ) =>
    containers[ i ].length == 0
        ? { n:0, i }
        : containers[i]
            .reduce( ( max, u ) => {

                const { n, i } = rootContainer( containers, u )
                return max.n >= n+1
                    ? max
                    : { n:n+1, i:u }

            }, {n:-1} )

// return true if hull a is inside b
// assuming a is either inside or outside b ( no intersection )
const inside = ( a, b ) =>
    // a is inside b
    //   <=> one point of a is inside b
    pointInside( b, a[0] )


// 2d hulls
module.exports = ( hulls ) => {

    // determine if some hull are holes
    const containers = hulls.map( () => [] )

    // determine which hull contains one other
    hulls.forEach( (_,b) =>
        hulls.forEach( (_,a) =>
            // test a inside b
            ( a != b ) && inside( hulls[a], hulls[b] ) && containers[ a ].push( b ) )
    )

    const shapes = hulls.map( hull => ({ hull, holes: [] }) )

    shapes.forEach( (s,k) => {

        const { n, i } = rootContainer( containers, k )

        if ( n%2 == 1 ) {
            shapes[ i ].holes.push( s.hull )
            shapes[ k ] = null
        }
    })

    for( let i=shapes.length; i--; )
        !shapes[ i ] && shapes.splice( i, 1 )

    // ensure that every hull have a constant orientation
    // and every hole the opposite orientation

    shapes.forEach( shape => {

        setOrientation( shape.hull )

        shape.holes.map( hole =>
            setOrientation( hole )
        )
    })

    return shapes
}
