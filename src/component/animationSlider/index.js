import React        from 'react'

import style        from './style.css'
import LiquidSlider from 'component/LiquidSlider'

const Slider = ({ k, auto, steps,  setTimeline, setTimelineAuto }) =>
(
    <div className={ style.container }>

        <LiquidSlider width={ 300 } height= { 100 } value={ k } onChange={ setTimeline } />

        <div className={ style.auto } onClick={ () => setTimelineAuto( !auto ) } >{ auto ? 'pause' : 'play' }</div>

    </div>
)

const { PropTypes } = React

Slider.propTypes = {

    k               : PropTypes.number.isRequired,

    steps           : PropTypes.arrayOf( PropTypes.number ).isRequired,

    setTimeline     : PropTypes.func.isRequired,
    setTimelineAuto : PropTypes.func.isRequired,
}

module.exports = Slider