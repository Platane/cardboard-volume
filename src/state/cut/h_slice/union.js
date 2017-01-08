import PolyBool             from 'polybooljs'
import setOrientation       from 'util/math/polygon/orientation/set'
import layers               from './layers'

const pointToArray = a => [a.x, a.y]
const arrayToPoint = a => ({ x: a[0], y: a[1] })

const shapeToPolyBool = ({ hull, holes }) =>
    ({
        regions : [ setOrientation( hull ).map( pointToArray ) ],
        inverted: false,
    })

const polyBoolToShapes = ({ regions, inverted }) =>
    [{
        hull    : regions[0].map( arrayToPoint ),
        holes   : [],
    }]

const union = ( layers ) => {

    if ( !layers )
        return null

    const polygons = [].concat(
        ...layers.map( ({ shapes }) =>
            shapes.map( shapeToPolyBool )
        )
    )

    if ( polygons.length == 0 )
        return []

    const unionSegments = polygons.reduce(
        (unionSegments, polygon) =>
            PolyBool.selectUnion( PolyBool.combine(unionSegments, PolyBool.segments(polygon)) )
        ,
        PolyBool.segments(polygons[0])
    )

    return polyBoolToShapes( PolyBool.polygon(unionSegments) )
}
union.dependencies = [ layers ]
union.stateless    = true

module.exports  = union
