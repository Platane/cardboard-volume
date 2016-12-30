import { connect }              from 'react-redux'
import { createSelector }       from '../abstract/createSelector'
import * as action              from 'action'
import throttle                 from 'util/time/throttle'

const mapStateToProps = createSelector({
    k :    'timeline.k',
})

const mapDispatchToProps = (dispatch) => ({

    setTimeline : throttle(
        30,
        ( k ) =>
            dispatch( action.setTimeline( k ) )
    ),
})

module.exports = connect( mapStateToProps, mapDispatchToProps )( require('./index') )