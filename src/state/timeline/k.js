
const k = ( action, previousValue = 0 ) =>
    action.type == 'timeline:set'

        ? Math.round( action.payload.k * 200 ) / 200
        : previousValue

k.source = true

module.exports = k
