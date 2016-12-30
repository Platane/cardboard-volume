import React        from 'react'
import Component    from './index'

class OriginState     extends React.Component {

    constructor( props ){
        super( props )

        this.state      = {
            opened      : false,
        }

        this.methods = {
            open        : () => this.setState({ opened: true }),
            close       : () => this.setState({ opened: false }),
        }
    }

    render(){
        return <Component { ...this.props } { ...this.state } { ...this.methods } />
    }

}

module.exports = OriginState