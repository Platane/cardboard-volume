import React            from 'react'

import style            from './style.css'
import Transitioned     from 'component/abstract/transitioned'
import ClickOutside     from 'component/abstract/clickOutside'
import InputFile        from './inputFile'

import extractGeometry  from 'util/extractGeometry'

const loadGeometry   = file =>
    new Promise( ( resolve, reject ) => {

        if ( 'undefined' == typeof FileReader)
            reject()

        const fr = new FileReader

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

        <Transitioned toTransition={ opened } delay={ 300 }>
            {
                ({ next, previous, transition }) =>
                    <div className={ style.square } onClick={ open } style={ next ? { height: ( samples.filter( x => x.name != name ).length +2 ) * 50 } : {} }>

                        <div className={ style.row }>
                            <div className={ style.icon }>{ name }</div>
                        </div>

                        { next && <ClickOutside onClickOutside={ close } ignoreClassName={ style.square } /> }

                        {
                            ( next || previous ) && samples
                                .filter( x => x.name != name )
                                .map( ({ geometry, name }) =>
                                    <div key={name} className={ style.row } onClick={() => selectGeometry( geometry, name )}>
                                        <div className={ style.icon }>{ name }</div>
                                    </div>
                                )
                        }
                        {
                            ( next || previous ) &&
                                <div className={ style.row }>
                                    <div className={ style.icon }>{ 'load' }</div>
                                    <InputFile onChange={ file => loadGeometry( file ).then( geo => selectGeometry( geo, file.name ) ) } />
                                </div>
                        }
                    </div>
            }
        </Transitioned>
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