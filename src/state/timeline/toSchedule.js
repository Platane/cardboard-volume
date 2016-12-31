import auto                 from './auto'
import k                    from './k'
import genUID               from 'util/uid'

const toSchedule = ( auto, k , toSchedule=[], _auto, _k ) => {

    if ( !auto || k >= 1 )
        return []

    if ( k != _k || toSchedule.length == 0 )
        toSchedule = [{
            date    : Date.now() + 60,
            action  : { type: 'timeline:increment' },
            meta    : { key: genUID() },
        }]

    return toSchedule
}

toSchedule.dependencies = [ auto, k ]

module.exports = toSchedule