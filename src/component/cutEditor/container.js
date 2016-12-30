import { connect }              from 'react-redux'
import { createSelector }       from '../abstract/createSelector'
import * as action              from 'action'
import throttle                 from 'util/time/throttle'

const mapStateToProps = createSelector({
    boundingBox     : 'object.boundingBox',
    boundingSphere  : 'object.boundingSphere',
    base            : 'cut.param.base.complete',
    positions       : 'cut.param.positions',
    stepWidth       : 'cut.param.stepWidth',
    origin          : 'cut.param.origin',
})

const mapDispatchToProps = (dispatch) => ({

    setOrigin : throttle(
        30,
        ( origin ) =>
            dispatch( action.setOrigin( origin ) )
    ),

    setStepWidth : throttle(
        30,
        ( stepWidth ) =>
            dispatch( action.setStepWidth( stepWidth ) )
    ),
})

module.exports = connect( mapStateToProps, mapDispatchToProps )( require('./index') )