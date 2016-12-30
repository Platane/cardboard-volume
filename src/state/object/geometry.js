
const geometry = ( action, previousValue = null ) =>
    action.type == 'object:set'

        ? action.payload.geometry
        : previousValue

geometry.source = true

module.exports = geometry
