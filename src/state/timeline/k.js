
const k = ( action, geometry, k = 0, _geometry ) => {

    if ( 'timeline:increment' == action.type )
        k = k + 0.01

    if ( 'timeline:set' == action.type )
        k = action.payload.k

    if ( 'timeline:auto:set' == action.type && action.payload.auto && k >= 1 )
        k = 0

    if ( geometry != _geometry )
        k = 0

    return Math.min( Math.max( Math.round( k * 10000 ) / 10000, 0 ), 1 )
}

k.source = true
k.dependencies = [ 'object.geometry' ]

module.exports = k
