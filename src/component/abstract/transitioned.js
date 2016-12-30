import React, {PropTypes, Component} from 'react'

/**
 * Transitioned,
 *  wrapper component, used to transition a prop from a previous state to a next,
 *    which is useful to use combined to css transition/animation
 *
 *  usage is similar to react-motion
 *
 *  use as :
 *
 *  ...<div>
 *       <Transitioned toTransition={ this.props.a } delay={ delay }  >
 *         {
 *           ({ next, previous }) =>  <div> was { previous } will be { next } </div>
 *         }
 *       </Transitioned>
 *    <div>
 *
 *  Transitioned children should be a unique function. This function receive in argument next and previous, which are the value to transition
 *
 *  Flow diagram :
 *
 *    k = 'a'             k change to 'b'
 *                             |
 *                             |<------------delay---------------->|
 *    . . . ------------------------------------------------------------------------------>
 *        next     : a                 next     : b                    next     : b
 *        previous : null              previous : a                    previous : null
 *
 *        transition : false           transition : true               transition : false
 *
 *
 *
 * with the option indirect, the Flow diagram looks like
 * ( insteand of doing a -> b, it goes a -> null -> b )
 *
 *
 * k = 'a'             k change to 'b'
 *                             |
 *                             |<------------delay---------------->|<------------delay---------------->|
 *    . . . ---------------------------------------------------------------------------------------------------------------------->
 *        next     : a                 next     : null                      next     : b                      next     : b
 *        previous : null              previous : a                         previous : null                   previous : null
 *
 *       transition : false            transition : true                    transition : true                 transition : false
 *
 *                                     indirectNext: b                      indirectNext: null
 *                                     transitionIndirect: true             transitionIndirect: false
 *
 */
// as componentWillReceiveProps is not called the first time, it always detect an animation at first time

class Transitioned extends Component {

    constructor( props ){
        super( props )

        this.state = {
            transition  : false,
            next        : this.props.noInitAnim ? null : this.props.toTransition,
        }
        this.cancel = null

        this.fadeOff = () => {
            clearTimeout( this.cancel )

            if( this.state.indirectNext ) {
                this.setState({ previous: null, next:this.state.indirectNext, indirectNext:null })

                clearTimeout( this.cancel )
                this.cancel = setTimeout( this.fadeOff, this.props.delay || 5000 )

            } else
                this.setState({ previous: null, transition:false, indirectNext:null, transitionIndirect:false })

        }

    }

    componentDidMount(){
        const next = this.props.toTransition

        if ( this.props.noInitAnim )

            this.setState({ next })

        else if ( next ) {

            this.setState({ next, transition:true })

            clearTimeout( this.cancel )
            this.cancel = setTimeout( this.fadeOff, this.props.delay || 5000 )

        }
    }

    componentWillReceiveProps(nextProps) {

        const next      = nextProps.toTransition
        const previous  = this.props.toTransition

        const change    = !nextProps.equal
            ? this.state.next != next
            : !!this.state.next != !!next || ( next && !nextProps.equal( this.state.next, next ) )

        if ( change ){
            this.setState(
                !previous || !nextProps.indirect
                    // pass to next now
                    ? { next, previous, transition:true, transitionIndirect:false, indirectNext:null }

                    // indirect mode -> go to the null state
                    : { next:null, previous, indirectNext:next, transition:true, transitionIndirect:!!next }
                )

            // prepare next check
            if ( next != previous || previous ) {
                clearTimeout( this.cancel )
                this.cancel = setTimeout( this.fadeOff, nextProps.delay || 5000 )
            }
        }
    }

    componentWillUnmount(){
        clearTimeout( this.cancel )
    }

    render(){
        const renderedChildren = this.props.children( this.state )
        return renderedChildren && React.Children.only(renderedChildren) || null
    }
}

Transitioned.propTypes = {
    equal           : PropTypes.func,
    delay           : PropTypes.number,
    indirect        : PropTypes.bool,
    noInitAnim      : PropTypes.bool,
}

export default Transitioned
