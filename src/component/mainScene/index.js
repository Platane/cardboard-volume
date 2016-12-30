import React        from 'react'
import initScene    from './scene'

class MainScene     extends React.Component {

    componentDidMount() {
        this.scene = initScene( this.context.store )
    }

    componentWillUnmount() {
        this.scene.destroy()
        this.scene = null
    }

    shouldComponentUpdate( ) {
        return false
    }

    render(){

        if ( this.refs.container && this.scene ) {

            const {width, height} = this.refs.container.getBoundingClientRect()

            const ratio = 1

            this.scene.setSize( width*ratio, height*ratio )
            this.scene.render()

            const canvas = this.scene.getCanvas()

            if( canvas.parentNode )
                canvas.parentNode.removeChild( canvas )

            this.refs.container.appendChild( canvas )
            canvas.style=`width:${width}px;height:${height}px;`

        } else
            requestAnimationFrame( () => this.forceUpdate() )


        return <div ref="container" style={{ width: '100%', height: '100%' }} />
    }

}

const { PropTypes } = React

MainScene.contextTypes = {
    store    : PropTypes.object,
}
MainScene.propTypes = {

}

module.exports = MainScene