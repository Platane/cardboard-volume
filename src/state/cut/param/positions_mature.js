import positions            from './positions'

const positions_mature = ( action, positions, positions_mature, _positions ) => {

    if ( positions != _positions )
        positions_mature = false

    if ( action.type == 'positions:mature' )
        positions_mature = true

    return positions_mature || false
}

positions_mature.source        = true
positions_mature.dependencies  = [ positions ]

module.exports  = positions_mature
