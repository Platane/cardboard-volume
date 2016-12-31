import React        from 'react'
import style        from './style.css'

const s = {
    tic : {
        stroke      : '#333',
        fill        : '#444',
        strokeWidth : 0.5,
    },
    stick : {
        stroke      : '#333',
        fill        : 'none',
        strokeWidth : 1,
    },
    line : {
        stroke      : '#333',
        fill        : 'none',
        strokeWidth : 2,
    },
}

const toPath = ( arr , width, height ) =>
    'M'+arr.map( (h,i) => ( i/(arr.length-1) * width )+' '+( h * 2 ) ).join('L')


const render = ({ width, height, k, wave_h }, onDown) =>
(
    <svg
        width={width}
        height={height}
        className={ style.container }
        >

        <g
            ref="slideZone"
            transform={`translate( 10, 0 ) scale(${ ( width - 20 ) / width })`}
            onMouseDown={ onDown }
            onTouchStart={ onDown }
            >

            <rect x={0} y={0} width={width} height={height} fill="transparent" />

            <g transform={`translate( ${ width * k }, 40 )`}>
                <circle cx={0} cy={0} r={5} { ...s.tic } />
            </g>

            <g transform={'translate( 0, 50 )'}>
                { false && wave_h
                    .map( (h,i) =>
                        <line
                            key={ i }
                            x1={ i/(wave_h.length-1) * width }
                            x2={ i/(wave_h.length-1) * width }
                            y1={ 0 }
                            y2={ h * 2 }
                            { ...s.stick }
                            />
                    )
                }
                <path d={ toPath( wave_h, width, height) } { ...s.line } />
            </g>
        </g>

    </svg>
)

const getPointerX = event =>
    event.targetTouches ? event.targetTouches[ 0 ].clientX : event.clientX

class Slider     extends React.Component {

    constructor( props ){
        super( props )

        this.up   = this.up.bind( this )
        this.down = this.down.bind( this )
        this.move = this.move.bind( this )
    }

    up(){
        window.removeEventListener( 'mousemove',    this.move )
        window.removeEventListener( 'touchmove',    this.move )
        window.removeEventListener( 'mouseup',      this.up )
        window.removeEventListener( 'touchend',     this.up)
        window.removeEventListener( 'touchcancel',  this.up)
    }

    down( event ){

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

        this.move( event )
    }

    move( event ){

        const { right, left } = this.refs.slideZone.getBoundingClientRect()

        const k = ( getPointerX( event ) - left )/( right - left )

        this.props && this.props.onChange( k )
    }

    componentWillUnmount() {
        window.removeEventListener( 'mousemove',    this.move )
        window.removeEventListener( 'touchmove',    this.move )
        window.removeEventListener( 'mouseup',      this.up )
        window.removeEventListener( 'touchend',     this.up)
        window.removeEventListener( 'touchcancel',  this.up)
    }

    render(){
        return render( this.props, this.down )
    }
}

const { PropTypes } = React

Slider.propTypes = {
    k               : PropTypes.number.isRequired,
    wave_h          : PropTypes.array.isRequired,
    onChange        : PropTypes.func.isRequired,
}

module.exports = Slider