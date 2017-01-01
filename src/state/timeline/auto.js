import k    from './k'

const auto = ( action, geometry, k, auto = false, _geometry ) => {

    if ( !geometry )
        return false

    if ( k >= 1 )
        return false

    if ( 'timeline:set' == action.type )
        return false

    if ( 'timeline:auto:set' == action.type )
        return action.payload.auto

    if ( geometry != _geometry )
        return true

    return auto
}

auto.source = true
auto.dependencies = [ 'object.geometry', k ]

module.exports = auto
