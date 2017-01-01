import React        from 'react'
import style        from './style.css'

const slice = ( arr, e ) => {
    if ( e <= arr[0].x )
        return [ [], arr ]

    if ( arr[ arr.length-1 ].x <= e )
        return [ arr, [] ]

    let b = 0
    while ( arr[ b ].x <= e )
        b = b+1

    const a = b-1

    const k = ( e - arr[a].x )/( arr[b].x - arr[a].x )

    const u = {
        x : e,
        y : arr[a].y + k * ( arr[b].y - arr[a].y ),
    }

    return [ [ ...arr.slice(0,b), u ], [ u, ...arr.slice( b ) ] ]
}

const toPath = ( arr, width ) =>
    'M'+arr.map( ({ x, y }) => Math.round( x * width )+' '+Math.round( y * 2 ) ).join('L')


const render = ({ width, height, k, wave_h }, onDown) => {

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

            <g transform={`translate( ${ width * k }, 40 )`}>
                <circle cx={0} cy={0} r={5} className={style.tic} />
            </g>

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

                { before.length > 0 && <path d={ toPath( before, width ) } className={ style.line1 } /> }
                { after.length > 0 && <path d={ toPath( after, width ) } className={ style.line2 } /> }
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