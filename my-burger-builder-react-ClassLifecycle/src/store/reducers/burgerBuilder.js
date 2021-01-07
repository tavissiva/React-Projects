import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false, 
    building: false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIncredient = (state, action) => {
    //handling utility func helper
    const updatedIngredient = updateObject(
        state.ingredients, 
        { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    );
    const updatedState = {
        ingredients: updatedIngredient,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true
    }
    return updateObject( state, updatedState);
}

const removeIngredient = (state, action) => {
    return{
        ...state,
        ingredients: {
            ...state.ingredients,
             [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
        building: true
    };
}
const setIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    }
}

const fetchIngredientsFailed = ( state, action ) => {
    return {
        ...state,
        error: true
    }
}

const reducer = (state = initialState, action ) => {

    switch(action.type){
        case actionTypes.ADD_INGREDIENT: 
            return addIncredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient( state, action );
        case actionTypes.SET_INGREDIENT:
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
}

export default reducer;