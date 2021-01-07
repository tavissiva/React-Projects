import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';  
import { updateObject, checkValidity } from '../../../shared/utility';  

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false    
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest',displayValue: 'Fastest'},
                        {value: 'cheapest',displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for( let formElementIdentifier in this.state.orderForm ) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);

    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject( this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity( event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsvalid = true;
        for( let inputIdentifier in updatedOrderForm) {
            formIsvalid = updatedOrderForm[inputIdentifier].valid && formIsvalid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsvalid});

    }

    render() {

        const formElementsArray = [];
        for( let key in this.state.orderForm ) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let formOrSpinner = (
            <div>
                <h4>Enter Your Contact Data</h4>
                <form className={styles.FormStyle} onSubmit={this.orderHandler}>
                    { formElementsArray.map( formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            inValid={ !formElement.config.valid }
                            shouldValidate={ formElement.config.validation }
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    ))}
                    <Button inputType='input' btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>

        );

        if( this.props.loading ){
            formOrSpinner = <Spinner />;
        }

        return (
            <div className={styles.ContactData }>
                { formOrSpinner }
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));