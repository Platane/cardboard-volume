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

    down( e ){
        this.setState({
            dragging    : true,

            anchorX     : getPointerX( e ),
            anchorY     : getPointerY( e ),

            originX     : this.props.origin.u,
            originY     : this.props.origin.v,
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

        const origin = {
            u : ( getPointerX( e ) - this.state.anchorX ) * this.props.ratio + this.state.originX,
            v : ( getPointerY( e ) - this.state.anchorY ) * this.props.ratio + this.state.originY,
        }

        this.props.setOrigin( origin )
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