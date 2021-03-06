import { connect }              from 'react-redux'
import { createSelector }       from '../abstract/createSelector'
import * as action              from 'action'

const mapStateToProps = createSelector({
    geometry    :    'object.geometry',
    name        :    'object.name',
})

const mapDispatchToProps = (dispatch) => ({

    selectGeometry : ( geometry ) =>
        dispatch( action.setObject( geometry ) )
    ,
})

module.exports = connect( mapStateToProps, mapDispatchToProps )( require('./index') )