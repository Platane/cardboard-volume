import React        from 'react'
import ObjectShape  from './objectShape'
import Origin       from './origin/state'
import Step         from './step/state'

import style        from './style.css'


const THREE = require('util/three')

const dot = ( a, b ) =>
    THREE.Vector3.prototype.dot.call( a, b )

const Editor = ( props ) => {

    const { width, height, base } = props

    if ( !props.boundingSphere )
        return null

    const max   = {
        x : dot( base.u, props.boundingBox.max ),
        y : dot( base.v, props.boundingBox.max ),
    }
    const min   = {
        x : dot( base.u, props.boundingBox.min ),
        y : dot( base.v, props.boundingBox.min ),
    }

    {
        const larger = Math.max( max.x - min.x, max.y - min.y )
        max.x += larger * 0.1
        max.y += larger * 0.1
        min.x -= larger * 0.1
        min.y -= larger * 0.1
    }

    const l = Math.max( max.x - min.x, max.y - min.y )

    const ratio = l / Math.min( width, height )

    return (
        <div className={ style.container }>
            <div className={ style.header } />
            <div className={ style.content } >
                <svg
                    width={ (max.x - min.x) * ratio }
                    height={ (max.y - min.y) * ratio }
                    className={ style.drawZone }
                    viewBox={`${ min.x } ${ min.y } ${ max.x - min.x } ${ max.y - min.y }`}
                    >



                    <Step  {...props} ratio={ ratio } />

                    <ObjectShape  {...props} ratio={ ratio } />

                    <Origin  {...props} ratio={ ratio } />
                </svg>
            </div>
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