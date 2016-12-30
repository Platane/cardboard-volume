import React        from 'react'
import palette      from 'component/theme/palette'

const THREE = require('util/three')

const dot = ( a, b ) =>
    THREE.Vector3.prototype.dot.call( a, b )


const style = {
    boundingSphere : {
        fill        : 'none',
        stroke      : palette.vibrant[2],
        strokeWidth : 0.2,
    },
}

const ObjectShape = ( props ) => {

    const { boundingSphere, boundingBox, base } = props

    const r = boundingSphere.radius

    let d
    {
        const top       = dot( base.v, boundingBox.min )
        const bottom    = dot( base.v, boundingBox.max )
        const left      = dot( base.u, boundingBox.min )
        const right     = dot( base.u, boundingBox.max )

        d = [
            'M',    left,   bottom,
            'L',    right,  bottom,
            'L',    right,  top,
            'L',    left,   top,
            'Z'
        ].join(' ')
    }

    return (
        <g>
            <circle { ...style.boundingSphere } cx={ 0 } cy={ 0 } r={ r } />
            <path { ...style.boundingSphere } d={ d } />
        </g>
    )
}

const { PropTypes } = React

ObjectShape.propTypes = {
    setOrigin       : PropTypes.func.isRequired,
    setStepWidth    : PropTypes.func.isRequired,
}

module.exports = ObjectShape