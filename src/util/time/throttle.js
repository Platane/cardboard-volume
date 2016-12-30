module.exports = ( delay, fn ) => {

    let cooling     = false
    let args        = null
    let timeout     = null
    let shouldExec  = false

    const call = () => {

        if ( cooling )
            return

        if ( shouldExec ) {

            fn( ...args )

            shouldExec  = false
            cooling     = true

            clearTimeout( timeout )
            timeout = setTimeout( whenCooled, delay )
        }
    }


    const whenCooled = () => {

        clearTimeout( timeout )

        cooling  = false

        call()
    }

    return ( ..._args ) => {

        args        = _args
        shouldExec  = true
        call()
    }
}