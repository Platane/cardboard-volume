import React        from 'react'
import palette      from 'component/theme/palette'

const THREE = require('util/three')

const dot = ( a, b ) =>
    THREE.Vector3.prototype.dot.call( a, b )


const style = {
    originDot : {
        r       : 4,
        fill    : palette.vibrant[0],
        // stroke  : 'none',
    },
}

const Origin = ( props ) => {

    const { origin, ratio, onDown } = props


    return (
        <g>
            <circle
                { ...style.originDot }
                cx={ origin.u }
                cy={ origin.v }
                r={ style.originDot.r * ratio }
                onMouseDown={ onDown }
                onTouchStart={ onDown }
                />
        </g>
    )
}

const { PropTypes } = React

Origin.propTypes = {
    onDown    : PropTypes.func.isRequired,
}

module.exports = Origin