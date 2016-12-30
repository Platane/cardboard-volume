import React            from 'react'

import style            from './style.css'

const Stats = ({ verticeCount, triangleCount }) =>
(
    <div className={ style.container }>

        <div className={ style.row }>
            <div className={ style.icon }>o</div>
            <div className={ style.numeric }>{ verticeCount }</div>
            <div className={ style.label }>vertices</div>
        </div>

        <div className={ style.row }>
            <div className={ style.icon }>o</div>
            <div className={ style.numeric }>{ triangleCount }</div>
            <div className={ style.label }>triangles</div>
        </div>

    </div>
)

const { PropTypes } = React

Stats.propTypes = {

    verticeCount  : PropTypes.number.isRequired,
    triangleCount : PropTypes.number.isRequired,
}

module.exports = Stats