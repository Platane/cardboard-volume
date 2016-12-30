import React        from 'react'
import palette      from 'component/theme/palette'

const style = {
    line : {
        stroke      : palette.vibrant[0],
        strokeWidth : 1.2,
    },
    collisionBox : {
        stroke      : 'transparent',
        strokeWidth : 6,
    },
}

const Step = ( props ) => {

    const { positions, ratio, onDown } = props

    const lineSyle = { ...style.line, strokeWidth: style.line.strokeWidth * ratio }
    const collisionBoxSyle = { ...style.collisionBox, strokeWidth: style.collisionBox.strokeWidth * ratio }

    return (
        <g>
            {
                positions.u.map( (k,i) =>
                    <g key={i} transform={`translate(${k},0)`} onMouseDown={ e => onDown( e, 'u', i ) }>

                        <line x1={0} x2={0} y1={-999} y2={999} { ...collisionBoxSyle } />

                        <line x1={0} x2={0} y1={-999} y2={999} { ...lineSyle } />

                    </g>
                )
            }
            {
                positions.v.map( (k,i) =>
                    <g key={i} transform={`translate(0,${k})`} onMouseDown={ e => onDown( e, 'v', i ) }>

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