require('file-loader?name=index.html!./index.html')

import reducerTree              from './state'
import * as Redux               from 'redux'
import RefineryCreate           from 'refinery-js'
import * as action              from 'action'


const { reduce, initState }   = RefineryCreate( reducerTree )

const store = Redux.createStore( reduce, initState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

;[
    require('./sideEffect/ui'),
    require('./sideEffect/scheduler'),
]
    .forEach( init => init( store ) )



{
    const extractGeometry   = require('util/extractGeometry')

    const cubeOBJ   = require('raw-loader!./asset/obj/skull.obj')

    const geometry  = extractGeometry( cubeOBJ )

    store.dispatch( action.setObject( geometry, 'skull' ) )
}