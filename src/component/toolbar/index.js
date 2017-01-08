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

        <div className={ style.editor }>
            <CutEditor width={300} height={300} />
        </div>

    </div>
)

const { PropTypes } = React

Toolbar.propTypes = {

    // Threejs geometry
    geometry        : PropTypes.object,

    selectGeometry  : PropTypes.func.isRequired,
}

module.exports = Toolbar