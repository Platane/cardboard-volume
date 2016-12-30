import React    	from 'react'

import style        from './style.css'

class InputFile     extends React.Component {

    constructor( props ){
        super( props )

        this.state      = {
            key      : null,
        }

        this.onChange = event => {
            const file = event.target.files[0]
            const fileName = file && file.name

            this.setState({ key: fileName+Math.random() })
            this.props.onChange && this.props.onChange( file )
        }
    }

    render(){
        return (
            <input
                key         = { this.state.key }
                type        = "file"
                accept      = { this.props.accept || '*' }
                className   = { style.input }
                onChange    = { this.onChange }
                />
        )
    }
}

const { PropTypes } = React

InputFile.propTypes = {

    accept          : PropTypes.string,
    onChange        : PropTypes.func,
}


module.exports = InputFile
