import PolyBool             from 'polybooljs'
import setOrientation       from 'util/math/polygon/orientation/set'

const THREE = require('util/three')

const project = ( m, p ) =>
    ( new THREE.Vector2() )
        .fromArray(
            m.applyToVector3Array( [p.x,p.y,p.z] )
        )

const pointToArray = a => [a.x, a.y]

// substract the rectangle poly from the shapes
// return an array of shapes
const substract = ( shapes, rectangles ) => {

    // tansform the shapes to polyBool recognized structure
    const polygons = []
    shapes.forEach( ({ hull, holes }) => {
        polygons.push( hull.map( pointToArray ) )
    })

    const res = PolyBool.difference(
        {
            regions : [
                ...polygons,
            ],
            inverted: false
        },
        {
            regions : rectangles.map( arr => setOrientation( arr, true ).map( pointToArray ) ),
            inverted: false
        },
    )

    return res.regions
        .map(
            arr =>
                ({
                    hull    : arr.map( u => ({ x:u[0], y:u[1] }) ),
                    holes   : [],
                })
        )
}

const process =  ( axe, fullSlices, base, positions, intersection ) =>

    fullSlices.map( ( { _P, P, shapes }, i ) => {

        const vy    = project( _P, base.h ).sub( project( _P, {x:0,y:0,z:0} ) )

        // also project u in the v plan
        const vx    = project( _P, axe == 'u' ? base.v : base.u ).sub( project( _P, {x:0,y:0,z:0} ) )

        const rectangles = positions

            .map( ( x, j ) => {

                if ( !intersection[ i ][ j ] )
                    return

                const { min, max } = intersection[ i ][ j ]
                const h = 0.5
                const marge = 2
                const up = axe == 'v'
                    ? i % 2 == 0
                    : j % 2 == 1

                const a = ( max + min ) / 2
                const b = up ? max + marge : min - marge

                // build collider rectangle
                return [

                    ( new THREE.Vector2() )
                      .set( 0,0 )
                      .addScaledVector( vy, + a )
                      .addScaledVector( vx, + ( x + h ) )
                    ,

                    ( new THREE.Vector2() )
                      .set( 0,0 )
                      .addScaledVector( vy, + a )
                      .addScaledVector( vx, + ( x - h ) )
                    ,

                    ( new THREE.Vector2() )
                      .set( 0,0 )
                      .addScaledVector( vy, + b )
                      .addScaledVector( vx, + ( x - h ) )
                    ,

                    ( new THREE.Vector2() )
                      .set( 0,0 )
                      .addScaledVector( vy, + b )
                      .addScaledVector( vx, + ( x + h ) )
                    ,
                ]

            })

            .filter( x => x )

        return {
            shapes : substract( shapes, rectangles ),
            P,
            _P,
        }

    })

// grid[ a ][ b ] = reverse( grid )[ b ][ a ]
const reverse = grid => {
    const _grid = []
    for( let a=grid.length;a--;)
    for( let b=grid[a].length;b--;)
        ( _grid[ b ] = _grid[ b ] || [] )[ a ] = grid[ a ][ b ]

    return _grid
}

const computeSlidingCut = ( base, positions, fullSlices, intersection ) =>
    ({
        u : process( 'u', fullSlices.u, base, positions.v, intersection ),
        v : process( 'v', fullSlices.v, base, positions.u, reverse( intersection ) ),
    })

module.exports  = computeSlidingCut
