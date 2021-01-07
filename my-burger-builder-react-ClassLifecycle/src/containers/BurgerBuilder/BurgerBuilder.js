import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
// import axios from 'axios';
import SpinningLoader from '../../components/UI/Spinner/Loader/Loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';


class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }


    updatePurchaseState( ingredients ) {

        const sum = Object.keys(ingredients)
            .map( (igKey) => {
                return ingredients[igKey];
            })
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
        //this.setState({ purchasable: sum > 0});
        return sum > 0;
    }
    
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState( { purchasing: true } );
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();    
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for( let key in disabledInfo )
            disabledInfo[ key ] = disabledInfo[ key ] <= 0;

        let orderSummaryOrSpinner = null;
        let burgerOrSpinner = this.props.error? 
                                <p style={{textAlign:'center'}}>Ingredients can't be loaded! </p>:
                                <SpinningLoader />;

        if( this.props.ings ) {
            burgerOrSpinner = (
                <React.Fragment>
                    <Burger ingredients = { this.props.ings }/>
                    <BuildControls 
                    ingredientAdded = { this.props.onIngredientAdded  } 
                    ingredientRemoved = { this.props.onIngredientRemoved } 
                    disabled = { disabledInfo }
                    price = { this.props.price } 
                    isAuth = { this.props.isAuthenticated }
                    purchasable = { this.updatePurchaseState(this.props.ings) }
                    ordered = { this.purchaseHandler } />
                </React.Fragment>
            );
            orderSummaryOrSpinner = <OrderSummary
                            ingredients = { this.props.ings }
                            price = { this.props.price.toFixed(2) }
                            purchaseCancelled = { this.purchaseCancelHandler }
                            purchaseContinued = { this.purchaseContinueHandler } />
        }

        // if( this.state.loading ){
        //     orderSummaryOrSpinner = <Spinner />;
        // }

        return (
            <React.Fragment>
                <Modal show = { this.state.purchasing } modelClosed = { this.purchaseCancelHandler }>
                    { orderSummaryOrSpinner }
                </Modal>
                { burgerOrSpinner }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler( BurgerBuilder, axios));