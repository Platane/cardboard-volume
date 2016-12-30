import React        from 'react'
import ReactDOM     from 'react-dom'
import {Provider}   from 'react-redux'
import App          from 'component/app'

module.exports = store => {
    ReactDOM.render( <Provider store={store}><App/></Provider>, document.getElementById('app') )

    return () =>
        ReactDOM.unmountComponentAtNode( document.getElementById('app') )
}