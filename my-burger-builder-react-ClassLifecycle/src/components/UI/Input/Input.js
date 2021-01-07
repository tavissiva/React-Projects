import React from 'react';

import styles from './Input.module.css';

const Input = (props) => {

    let inputElement = null;
    let inputStyleClass = [styles.InputElement];

    if( props.inValid && props.shouldValidate && props.touched ) {
        inputStyleClass.push(styles.Invalid);
    }

    switch( props.elementType ){
        case ('input'):
            inputElement = <input 
                                className={ inputStyleClass.join(' ') } 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                                className={ inputStyleClass.join(' ') } 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = <select
                                className={ inputStyleClass.join(' ') } 
                                value={props.value} 
                                style={{width: '105%'}}
                                onChange={props.changed}>
                                    { props.elementConfig.options.map( option => (
                                        <option key={option.value} value={option.value}>{ option.displayValue }</option>
                                    ))}
                            </select>;
            break;
        
        default:
            inputElement = <input 
                                className={ inputStyleClass.join(' ') } 
                                {...props.elementConfig} 
                                value={props.value} 
                                onChange={props.changed}/>;
    }

    return ( 
        <div className={styles.Input}>
            <label className={styles.Label}>{ props.label }</label>
            { inputElement }
        </div>
    );

};

export default Input;