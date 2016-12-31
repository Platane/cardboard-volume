import React        from 'react'

import style        from './style.css'

import CutEditor        from '../cutEditor/container'
import ObjectPreview    from '../objectPreview/container'
import AnimationSlider  from '../animationSlider/container'

const Toolbar = ({ geometry, selectGeometry, name }) =>
(
    <div className={ style.container }>

        <div className={ style.objectPreview }>
            <ObjectPreview />
        </div>

        <div className={ style.slider }>
            <AnimationSlider />
        </div>

        <CutEditor width={300} height={500} />

    </div>
)

const { PropTypes } = React

Toolbar.propTypes = {

    // Threejs geometry
    geometry        : PropTypes.object,

    selectGeometry  : PropTypes.func.isRequired,
}

module.exports = Toolbar