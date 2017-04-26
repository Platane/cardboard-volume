require('file-loader?name=index.html!./index.html')

import reducerTree              from './state'
import RefineryCreate           from 'refinery-js'
import * as action              from 'action'

import initUI                   from './sideEffect/ui'
import initScheduler            from './sideEffect/scheduler'

import { createStore, applyMiddleware, compose } from 'redux'


const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err)
        throw err
    }
}

let store
{

    const { reduce, initState }   = RefineryCreate( reducerTree )

    // create redux store
    const middlewares = [
        crashReporter,
    ]
    const enhancers = [
        ...(
            'undefined' != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__
            ? [ window.__REDUX_DEVTOOLS_EXTENSION__({ maxAge: 50, latency: 500 }) ]
            : []
        ),
        applyMiddleware( ...middlewares ),
    ]
    store = createStore( reduce, initState, compose( ...enhancers ) )

    ;[
        initUI,
        initScheduler,
    ].forEach( init => init( store ) )




    const extractGeometry   = require('util/extractGeometry')

    const cubeOBJ   = require('raw-loader!./asset/obj/skull.obj')

    const geometry  = extractGeometry( cubeOBJ )

    store.dispatch( action.setObject( geometry, 'skull' ) )
}