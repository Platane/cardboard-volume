import React        from 'react'

import style        from './style.css'

import CutEditor        from '../cutEditor/container'
import ObjectPreview    from '../objectPreview/container'

const Toolbar = ({ geometry, selectGeometry, name }) =>
(
    <div className={ style.container }>

        <ObjectPreview />

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