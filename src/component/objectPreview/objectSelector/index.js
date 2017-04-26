import React            from 'react'

import style            from './style.css'
import {Transition}     from 'react-propstransition'
import ClickOutside     from 'component/abstract/clickOutside'
import Icon             from 'component/icon'
import InputFile        from './inputFile'

import extractGeometry  from 'util/extractGeometry'

const loadGeometry   = file =>
    new Promise( ( resolve, reject ) => {

        if ( 'undefined' == typeof FileReader)
            reject()

        const fr = new window.FileReader

        fr.onload = () => resolve( extractGeometry( fr.result ) )

        fr.onerror = reject

        fr.readAsText( file )

    })


const ObjectSelector = ({ samples, opened, name,   open, close, selectGeometry }) =>
(
    <div className={ style.container }>

        <div className={ style.ribbon }>
            <div className={ style.name }>{ name }</div>
        </div>

        <Transition toTransition={ name } delay={ 1000 }>
            {
                ({ next: name_next, previous: name_previous, transition: name_transition }) => console.log( 'name_next', name_next ) ||

                    <Transition toTransition={ opened } delay={ 3000 }>
                        {
                            ({ next: opened_next, previous: opened_previous, transition: opened_transition }) =>
                                <div className={ style.square } onClick={ opened ? close : open } style={ opened_next ? { height: ( samples.filter( x => x.name != name ).length +2 ) * 50 } : {} }>

                                    <div className={ style.row +' '+style.rowSelected }>
                                        <div className={ style.iconWrapper }>
                                            <Icon icon={name_previous || name_next} className={ style.icon } />
                                        </div>
                                    </div>

                                    { opened_next && <ClickOutside onClickOutside={ close } ignoreClassName={ style.square } /> }

                                    {
                                        ( opened_next || opened_previous ) && samples
                                            .filter( x => x.name != (name_previous || name_next) )
                                            .map( ({ geometry, name }) =>
                                                <div key={name} className={ style.row } onClick={() => selectGeometry( geometry, name )}>
                                                    <div className={ style.iconWrapper }>
                                                        <Icon icon={name} className={ style.icon } />
                                                    </div>
                                                </div>
                                            )
                                    }
                                    {
                                        ( opened_next || opened_previous ) &&
                                            <div className={ style.row }>
                                                <div className={ style.icon }>{ 'load' }</div>
                                                <InputFile onChange={ file => loadGeometry( file ).then( geo => selectGeometry( geo, file.name ) ) } />
                                            </div>
                                    }
                                </div>
                        }
                    </Transition>
            }
        </Transition>
    </div>
)

const { PropTypes } = React

ObjectSelector.propTypes = {

    opened          : PropTypes.bool.isRequired,
    name            : PropTypes.string,
    samples         : PropTypes.array.isRequired,

    selectGeometry  : PropTypes.func.isRequired,
    open            : PropTypes.func.isRequired,
    close           : PropTypes.func.isRequired,
}

module.exports = ObjectSelector