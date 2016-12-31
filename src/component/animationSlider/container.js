import { connect }              from 'react-redux'
import { createSelector }       from '../abstract/createSelector'
import * as action              from 'action'
import throttle                 from 'util/time/throttle'

const mapStateToProps = state => ({
    steps   : [ 0, 0.33, 0.66, 1 ],
    k       : state['timeline.k'],
    auto    : state['timeline.auto'],
})

const mapDispatchToProps = (dispatch) => ({

    setTimeline : throttle(
        30,
        ( k ) =>
            dispatch( action.setTimeline( k ) )
    ),

    setTimelineAuto : auto =>
        dispatch( action.setTimelineAuto( auto ) )
    ,
})

module.exports = connect( mapStateToProps, mapDispatchToProps )( require('./index') )