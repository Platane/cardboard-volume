import React        from 'react'
import initScene    from './initScene'

class ModelView     extends React.Component {

    componentDidMount() {
        this.scene = initScene()
    }

    componentWillUnmount() {
        this.scene.destroy()
        this.scene = null
    }

    shouldComponentUpdate( nextProps ) {
        return this.props.geometry != nextProps.geometry
    }

    render(){

        if ( this.refs.container && this.scene ) {

            const {width, height} = this.refs.container.getBoundingClientRect()

            const ratio = 2

            this.scene.setSize( width*ratio, height*ratio )
            this.scene.setGeometry( this.props.geometry )
            this.scene.render()

            const canvas = this.scene.getCanvas()

            if( canvas.parentNode )
                canvas.parentNode.removeChild( canvas )

            this.refs.container.appendChild( canvas )
            canvas.style.width  = width+'px'
            canvas.style.height = height+'px'

        } else
            requestAnimationFrame( () => this.forceUpdate() )


        return <div ref="container" style={{ width: '100%', height: '100%' }} />
    }

}

const { PropTypes } = React

ModelView.propTypes = {

    // Threejs geometry
    geometry : PropTypes.object,
}

module.exports = ModelView