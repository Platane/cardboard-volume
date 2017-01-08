import React        from 'react'
import palette      from 'component/theme/palette'

const THREE = require('util/three')

const dot = ( a, b ) =>
    THREE.Vector3.prototype.dot.call( a, b )


const style = {
    boundingSphere : {
        fill            : 'none',
        stroke          : palette.vibrant[2],
        strokeWidth     : 0.2,
        strokeLinecap   : 'round',
        strokeLinejoin  : 'round',
    },
    outline       : {
        fill            : 'none',
        stroke          : palette.vibrant[0],
        strokeWidth     : 0.6,
        strokeLinecap   : 'round',
        strokeLinejoin  : 'round',
    },
}

const ObjectShape = ( props ) => {

    const { boundingBox, base, h_sliceLayer, h_sliceUnion } = props

    let d_box
    {
        const top       = dot( base.v, boundingBox.min )
        const bottom    = dot( base.v, boundingBox.max )
        const left      = dot( base.u, boundingBox.min )
        const right     = dot( base.u, boundingBox.max )

        d_box = [
            'M',    left,   bottom,
            'L',    right,  bottom,
            'L',    right,  top,
            'L',    left,   top,
            'Z'
        ].join(' ')
    }

    const d_slice = h_sliceLayer
        .map( ({ shapes }) =>
            shapes.map( shape =>
                [ shape.hull, ...shape.holes ]
                    .map( polygon =>
                        'M' + polygon.map( p => p.x+' '+p.y ).join('L')+'Z'
                    )
                    .join(' ')
            )
            .join(' ')
        )
        .join(' ')

    const d_outline = h_sliceUnion
        .map( shape =>
            [ shape.hull, ...shape.holes ]
                .map( polygon =>
                    'M' + polygon.map( p => p.x+' '+p.y ).join('L')+'Z'
                )
                .join(' ')
        )
        .join(' ')


    return (
        <g>
            <path { ...style.boundingSphere } d={ d_slice } />
            <path { ...style.outline } d={ d_outline } />
        </g>
    )
}

const { PropTypes } = React

ObjectShape.propTypes = {
    setOrigin       : PropTypes.func.isRequired,
    setStepWidth    : PropTypes.func.isRequired,
}

module.exports = ObjectShape