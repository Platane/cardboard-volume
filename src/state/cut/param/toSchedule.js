import positions_mature     from './positions_mature'
import positions            from './positions'
import genUID               from 'util/uid'

const toSchedule = ( positions, positions_mature, toSchedule, _positions ) => {

    if ( !toSchedule )
        toSchedule = []

    if ( positions_mature )
        toSchedule = []

    if (
        positions != _positions
        ||
        ( !positions_mature && toSchedule.length == 0 )
    )
        toSchedule = [{
            date    : Date.now() + 200,
            action  : { type: 'positions:mature' },
            meta    : { key: genUID() },
        }]

    return toSchedule
}

toSchedule.dependencies = [ positions, positions_mature ]

module.exports = toSchedule