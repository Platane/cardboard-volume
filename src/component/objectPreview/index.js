import React        from 'react'

import style        from './style.css'

import ModelView            from '../model'
import AnimationSlider      from '../animationSlider/container'
import ObjectSelector       from './objectSelector/state'
import Stats                from './stats'

import samples      from './samples'

const ObjectPreview = ({ name, geometry, selectGeometry, verticeCount, triangleCount }) =>
(
    <div className={ style.container }>

        <div className={ style.header }>
            <div className={ style.model }>
                <ModelView geometry={ geometry } />
            </div>
        </div>

        <div className={ style.content }>
            <div className={ style.objectSelector }>
                <ObjectSelector samples={samples} name={name} selectGeometry={selectGeometry} />
            </div>

            <Stats verticeCount={verticeCount} triangleCount={triangleCount} />
        </div>

        <div className={ style.slider }>
            <AnimationSlider />
        </div>
    </div>
)

const { PropTypes } = React

ObjectPreview.propTypes = {

    // Threejs geometry
    geometry        : PropTypes.object,

    selectGeometry  : PropTypes.func.isRequired,
}

module.exports = ObjectPreview