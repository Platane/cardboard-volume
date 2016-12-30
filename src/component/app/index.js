import React        from 'react'

import Toolbar      from 'component/toolbar/container'
import MainScene    from 'component/mainScene'

import style        from './style.css'

const App = () =>
(
    <div className={ style.container }>
        <div className={ style.toolbar }>
            <Toolbar />
        </div>

        <div className={ style.main }>
            <MainScene />
        </div>
    </div>
)

module.exports = App