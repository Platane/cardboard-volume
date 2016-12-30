import React        from 'react'
import Component    from './index'

const getPointerX = event =>
    event.targetTouches ? event.targetTouches[ 0 ].clientX : event.clientX

const getPointerY = event =>
    event.targetTouches ? event.targetTouches[ 0 ].clientY : event.clientY

class OriginState     extends React.Component {

    constructor( props ){
        super( props )

        this.state      = {
            dragging    : false,
        }

        this.up   = this.up.bind( this )
        this.down = this.down.bind( this )
        this.move = this.move.bind( this )
    }

    up(){
        this.setState({ dragging: false })
    }

    down( e, axe, k ){

        const sw        = this.props.stepWidth[ axe ]
        const position  = this.props.positions[ axe ][ k ]
        const n         = Math.round( ( position - this.props.origin[ axe ] ) / sw )

        if ( n == 0 )
            return

        this.setState({
            anchor          : axe == 'u' ? getPointerX( e ) : getPointerY( e ),
            stepWidthSource : sw,
            n,
            axe,
            dragging    : true,
        })

        window.removeEventListener( 'mousemove',    this.move )
        window.removeEventListener( 'touchmove',    this.move )
        window.removeEventListener( 'mouseup',      this.up )
        window.removeEventListener( 'touchend',     this.up)
        window.removeEventListener( 'touchcancel',  this.up)

        window.addEventListener( 'mousemove',    this.move )
        window.addEventListener( 'touchmove',    this.move )
        window.addEventListener( 'mouseup',      this.up )
        window.addEventListener( 'touchend',     this.up)
        window.addEventListener( 'touchcancel',  this.up)
    }

    move( e ){
        if ( !this.state.dragging )
            return

        const min = this.props.boundingSphere.radius / 12

        const delta = ( ( this.state.axe == 'u' ? getPointerX( e ) : getPointerY( e ) ) - this.state.anchor ) * this.props.ratio
        const sw    = Math.max( min, this.state.stepWidthSource + delta / this.state.n )

        this.props.setStepWidth({ ...this.props.stepWidth, [ this.state.axe ] : sw })
    }

    componentWillUnmount() {
        window.removeEventListener( 'mousemove',    this.move )
        window.removeEventListener( 'touchmove',    this.move )
        window.removeEventListener( 'mouseup',      this.up )
        window.removeEventListener( 'touchend',     this.up)
        window.removeEventListener( 'touchcancel',  this.up)
    }

    render(){
        return <Component { ...this.props } { ...this.state } onDown={ this.down } />
    }

}

const { PropTypes } = React

OriginState.propTypes = {
    setOrigin       : PropTypes.func.isRequired,
}

module.exports = OriginState