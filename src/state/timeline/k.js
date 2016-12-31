
const k = ( action, slices, k = 0, _slices ) => {

    if ( 'timeline:increment' == action.type )
        k = k + 0.01

    if ( 'timeline:set' == action.type )
        k = action.payload.k

    if ( slices != _slices )
        k = 0

    return Math.min( Math.max( Math.round( k * 10000 ) / 10000, 0 ), 1 )
}

k.source = true
k.dependencies = [ 'cut.slices' ]

module.exports = k
