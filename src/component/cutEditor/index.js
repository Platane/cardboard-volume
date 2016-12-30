import React        from 'react'
import ObjectShape  from './objectShape'
// import Param        from './param'
import Origin       from './origin/state'
import Step         from './step/state'

const Editor = ( props ) => {

    const { width, height } = props

    if ( !props.boundingSphere )
        return null

    const l     = props.boundingSphere.radius * 2.2
    const ratio = l / Math.min( width, height )

    return (
        <div style={{ width, height, position:'relative' }}>
            <svg
                width={width}
                height={height}
                style={{ backgroundColor: '#eee' }}
                viewBox={`${ -l/2 } ${ -l/2 } ${ l } ${ l }`}
                >

                <ObjectShape  {...props} ratio={ ratio } />

                <Step  {...props} ratio={ ratio } />

                <Origin  {...props} ratio={ ratio } />
            </svg>
        </div>
    )
}

const { PropTypes } = React

Editor.propTypes = {
    width           : PropTypes.number.isRequired,
    height          : PropTypes.number.isRequired,

    setOrigin       : PropTypes.func.isRequired,
    setStepWidth    : PropTypes.func.isRequired,
}

module.exports = Editor