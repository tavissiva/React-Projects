import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }


    updatePurchaseState( ingredients ) {

        const sum = Object.keys(ingredients)
            .map( (igKey) => {
                return ingredients[igKey];
            })
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0});
    }
    addIngredientHandler = ( type ) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState( updatedIngredients )
    }

    removeIngredientsHandler = ( type ) => {
        if( this.state.ingredients[type] <= 0)
            return;

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = this.state.ingredients[type] - 1;
        let updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });       
        this.updatePurchaseState( updatedIngredients );
    }

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert(" You Continue!!! ");
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for( let key in disabledInfo )
            disabledInfo[ key ] = disabledInfo[ key ] <= 0;
        return (
            <React.Fragment>
                <Modal show = { this.state.purchasing } modelClosed = { this.purchaseCancelHandler }>
                    <OrderSummary
                        ingredients = { this.state.ingredients }
                        price = { this.state.totalPrice.toFixed(2) }
                        purchaseCancelled = { this.purchaseCancelHandler }
                        purchaseContinued = { this.purchaseContinueHandler } />
                </Modal>
                <Burger ingredients = { this.state.ingredients }/>
                <BuildControls 
                 ingredientAdded = { this.addIngredientHandler } 
                 ingredientRemoved = { this.removeIngredientsHandler } 
                 disabled = { disabledInfo }
                 price = { this.state.totalPrice } 
                 purchasable = { this.state.purchasable }
                 ordered = { this.purchaseHandler } />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;