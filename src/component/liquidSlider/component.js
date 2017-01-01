import React                                from 'react'
import style                                from './style.css'
import { slice, interpolate, toSvgPath }    from './pathUtils'

const render = ({ width, height, steps, k, wave_h }, onDown) => {

    const points = wave_h.map( (h,i) => ({ x:i/(wave_h.length-1), y:h }) )
    const [ before, after ] = slice( points, k )

    return (
        <svg
            viewBox={`-10 0 ${width+20} ${height}`}
            width={width}
            height={height}
            className={ style.container }
            onMouseDown={ onDown }
            onTouchStart={ onDown }
            ref="slideZone"
            >

            <rect x={0} y={0} width={width} height={height} fill="transparent" />

            <g transform={'translate( 0, 50 )'}>

                { false && points
                       .map( ({ x,y }) =>
                           <line
                               key={ x }
                               x1={ x * width }
                               x2={ x * width }
                               y1={ 0 }
                               y2={ y * 2 }
                               className={ style.stick }
                               />
                       )
               }

                { before.length > 0 && <path d={ toSvgPath( before, width ) } className={ style.line1 } /> }
                { after.length > 0 && <path d={ toSvgPath( after, width ) } className={ style.line2 } /> }
            </g>

            <g transform={'translate( 0, 50 )'}>
                { steps
                    .map( (x,i) => {
                        const l      = 0.05
                        const offset = 0.005

                        let r = k < x+offset
                            ? Math.max( ( k-(x+offset-l) ) / l, 0 )
                            : Math.max( 1-( k-(x+offset) ) / l, 0.8 )

                        const h = interpolate( points, x )

                        return <g key={i} transform={`translate( ${ width * x }, ${ h > 0 ? h*2 : h*6 } )`}>
                            { r < 1 &&
                                <line x1={0} x2={0} y1={-3*(1-r)} y2={3*(1-r)} className={style.stepOff} />
                            }
                            { r > 0 &&
                                <circle cx={0} cy={0} r={r*6} className={style.step} />
                            }
                        </g>
                    })
                }
            </g>

            <g transform={`translate( ${ width * k }, 35 ) scale(0.4)`}>
                <path d="M 0 0 L 10 -12 Q 16 -20 16 -28 Q 16 -44 0 -44 Q -16 -44 -16 -28 Q -16 -20 -10 -12 Z M0 0 L0 80" className={style.tic} />
            </g>

        </svg>
    )
}

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