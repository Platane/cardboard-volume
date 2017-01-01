import React        from 'react'

import style        from './style.css'
import LiquidSlider from 'component/liquidSlider'

const Slider = ({ k, auto, steps,  setTimeline, setTimelineAuto }) =>
(
    <div className={ style.container }>

        <div className={ style.header } />

        <div className={ style.content }>

            <div className={ style.auto } onClick={ () => setTimelineAuto( !auto ) } >{ auto ? 'pause' : 'play' }</div>

            <div className={ style.slider }>
                <LiquidSlider width={ 250 } height= { 80 } value={ k } onChange={ setTimeline } />
            </div>

        </div>


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