import React        from 'react'
import palette      from 'component/theme/palette'

const THREE = require('util/three')

const dot = ( a, b ) =>
    THREE.Vector3.prototype.dot.call( a, b )

const style = {
    line : {
        // stroke      : palette.vibrant[1],
        stroke      : palette.dark,
        strokeWidth : 0.5,
    },
    collisionBox : {
        stroke      : 'transparent',
        strokeWidth : 6,
    },
}

const computeAxe = ( start, end, origin, stepWidth ) =>
    Array.from({ length: 100 })
        .map( (_,i,arr) => {

            const k = ( i - arr.length / 2 ) * stepWidth + origin

            const l = ( end - start ) * 0.1

            let alpha
            if ( k < start )
                alpha = Math.max( 0, 1 - ( start - k ) / l )

            else if ( k > end )
                alpha = Math.max( 0, 1 - ( k - end ) / l )

            else
                alpha = 1

            return { k, alpha }
        })

const Step = ( props ) => {

    const { ratio, base, boundingBox, stepWidth, origin, onDown } = props

    const lineSyle = { ...style.line, strokeWidth: style.line.strokeWidth * ratio }
    const collisionBoxSyle = { ...style.collisionBox, strokeWidth: style.collisionBox.strokeWidth * ratio }


    return (
        <g>
            {
                computeAxe( dot( base.u, boundingBox.min ), dot( base.u, boundingBox.max ), origin.u, stepWidth.u )
                    .map( ({ k, alpha },i) =>
                        <g key={i} transform={`translate(${k},0)`} onMouseDown={ e => onDown( e, 'u', i ) } >

                            <line x1={0} x2={0} y1={-999} y2={999} { ...collisionBoxSyle } />

                            <line x1={0} x2={0} y1={-999} y2={999} { ...lineSyle } />

                        </g>
                )
            }
            {
                computeAxe( dot( base.v, boundingBox.min ), dot( base.v, boundingBox.max ), origin.v, stepWidth.v )
                    .map( ({ k, alpha },i) =>
                        <g key={i} transform={`translate(0,${k})`} onMouseDown={ e => onDown( e, 'v', i ) } >

                            <line y1={0} y2={0} x1={-999} x2={999} { ...collisionBoxSyle } />

                            <line y1={0} y2={0} x1={-999} x2={999} { ...lineSyle } />

                        </g>
                )
            }
        </g>
    )
}

const { PropTypes } = React

Step.propTypes = {
    onDown    : PropTypes.func.isRequired,
}

module.exports = Step