import React        from 'react'
import Component    from './component'


/**
 *
 * compute the instant acceleration
 *
 */
const acc = ( stiffness, damping, x, v, target ) =>
    - stiffness * ( x - target ) - damping * v


class SliderState     extends React.Component {

    constructor( props ){
        super( props )

        const n = 50

        this.state      = {
            k           : this.props.k || 0,
            wave_h      : Array.from({ length : n }).map( () => 0 ),
            wave_v      : Array.from({ length : n }).map( () => 0 ),

            lastDate    : null,
            lastK       : null,
        }

        this.timeout    = null
        this.loop       = this.loop.bind( this )
    }

    componentWillReceiveProps( nextProps ) {
        this.updateK( nextProps.value )
    }

    updateK( k ){

        k = Math.max(0,Math.min(1,k))

        const now       = Date.now()
        const delta_t   = 20
        // const delta_t   = now - this.state.lastDate
        const delta_x   = k - this.state.k


        const v         = Math.min( 2,  Math.abs( delta_x/delta_t ) * 1000 )

        const wave_v = this.state.wave_v.slice()

        const ax        = Math.min( k, this.state.k ) - 0.03
        const bx        = Math.max( k, this.state.k ) + 0.03

        // let ax
        // let bx
        // {
        //     const min = Math.min( k , this.state.k )
        //     const max = Math.max( k , this.state.k )
        //     const l   = Math.max( Math.min( max - min, 2 ) , 0.04 )
        //
        //     if ( k < this.state.k ){
        //         ax = k - 0.02
        //         bx = ax + l
        //
        //     } else {
        //         bx = k + 0.02
        //         ax = bx - l
        //     }
        // }

        const a         = Math.max(0, Math.floor( ax*wave_v.length ) )
        const b         = Math.min(wave_v.length, Math.floor( bx*wave_v.length ) + 1 )

        for ( let i = a; i < b; i++ ) {

            const u = Math.max( 0, 1 - Math.abs( i / wave_v.length - ( ax + bx ) / 2 ) / ( ( bx - ax ) / 2 ) )

            const p = 1 - ( 1-u ) * ( 1-u )

            wave_v[ i ] += p * v
        }

        cancelAnimationFrame( this.timeout )
        this.setState({ wave_v, lastDate:now, k }, this.loop )
    }

    loop(){

        const wave_v = this.state.wave_v.slice()
        const wave_h = this.state.wave_h.slice()

        let idle = true

        for( let i=wave_v.length; i--; ){

            // compute acceleration
            const a = acc( 0.02, 0.08, wave_h[ i ], wave_v[ i ], 0 )

            wave_v[ i ] += a
            wave_h[ i ] += wave_v[ i ]

            idle = idle && ( Math.abs( wave_v[ i ] ) < 0.001 && Math.abs( wave_h[ i ] ) < 0.05 )
        }

        this.setState({ wave_v, wave_h })

        cancelAnimationFrame( this.timeout )
        if( !idle )
            this.timeout = requestAnimationFrame( this.loop )
    }

    componentWillUnmount() {
        cancelAnimationFrame( this.timeout )
    }

    render(){
        return <Component { ...this.props } { ...this.state } onChange={ this.props.onChange } />
    }

}

const { PropTypes } = React

SliderState.propTypes = {
    onChange       : PropTypes.func.isRequired,
}

module.exports = SliderState