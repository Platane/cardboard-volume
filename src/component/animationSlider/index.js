import React        from 'react'

import style        from './style.css'
import LiquidSlider from 'component/LiquidSlider'

const Slider = ({ k, setTimeline, steps }) =>
(
    <div className={ style.container }>

        <LiquidSlider width={ 400 } height= { 100 } value={ k } onChange={ setTimeline } />

    </div>
)

const { PropTypes } = React

Slider.propTypes = {

    k               : PropTypes.number.isRequired,

    steps           : PropTypes.arrayOf( PropTypes.number ).isRequired,

    setTimeline     : PropTypes.func.isRequired,
}

module.exports = Slider