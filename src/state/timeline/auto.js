import k    from './k'

const auto = ( action, slices, k, auto = false, _slices ) => {

    if ( !slices )
        return false

    if ( k >= 1 )
        return false

    if ( 'timeline:set' == action.type )
        return false

    if ( 'timeline:auto:set' == action.type )
        return action.payload.auto

    if ( slices != _slices )
        return true

    return auto
}

auto.source = true
auto.dependencies = [ 'cut.slices', k ]

module.exports = auto
