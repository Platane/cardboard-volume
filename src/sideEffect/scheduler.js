
module.exports = ( store ) => {

    const name = 'service.scheduler'

    let timeout = null
    const done = {}

    const loop = () => {

        clearTimeout( timeout )

        const first = store.getState()[ name ]
            .filter( x => !done[ x.meta.key ] )
            [ 0 ]

        if ( !first )
            return

        if ( first.date <= Date.now() ) {

            done[ first.meta.key ] = true

            store.dispatch( {...first.action, meta:{ from_scheduler: true, key: first.meta.key }} )

            return timeout = setTimeout( loop, 1 )
        }

        const delta = first.date - Date.now()

        timeout = setTimeout( loop, Math.max(0,delta) )
    }

    loop()

    return store.subscribe( loop )
}
