
const name = ( action, previousValue = null ) =>
    action.type == 'object:set'

        ? action.payload.name
        : previousValue

name.source = true

module.exports = name
