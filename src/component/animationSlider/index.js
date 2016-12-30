import React        from 'react'

import style        from './style.css'

const Slider = ({ k, setTimeline }) =>
(
    <div className={ style.container }>
        <input className={ style.input } type="range" min={0} max={1} step={0.01} value={k} onChange={ e => setTimeline( +e.target.value ) } />
    </div>
)

const { PropTypes } = React

Slider.propTypes = {

    // Threejs geometry
    k               : PropTypes.number.isRequired,

    setTimeline     : PropTypes.func.isRequired,
}

module.exports = Slider