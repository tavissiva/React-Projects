import React, {  useReducer, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';


const ingredientReducer = ( currentIngredientsState, action) => {
  switch( action.type ){
    case 'SET': 
      return action.ingredients;
    case 'ADD':
      return [...currentIngredientsState, action.ingredients];
    case 'DELETE':
      return currentIngredientsState.filter( ing => ing.id !== action.id);
    default:
      throw new Error(" ingredientReducer should not reached");
  }
}

const httpReducer = ( currentHttpState, action) => {
  switch( action.type ){
    case'SEND':
      return { loading: true, error: null};
    case 'RESPONSE':
      return { ...currentHttpState, loading: false};
    case 'ERROR':
      return { loading: false, error: action.error};
    case 'CLEAR':
      return { ...currentHttpState, error: null}
    default: 
      throw new Error(" HttpReducer should not Reached");
  }
}

const Ingredients = () => {

  const [ ingredientsState, dispatchIngredients ] = useReducer( ingredientReducer, []);
  const [ httpState, dispatchHttp ] = useReducer( httpReducer, { loading: false, error: null});

  // const [ ingredientsState, setIngredientsState ] = useState([]);
  // const [ loadingState, setLoadingState ] = useState(false);
  // const [ errorState, setErrorState ] = useState();

  const filteredIngredientsHandler = useCallback(filterIngredients => {
    // setIngredientsState(filterIngredients);
    dispatchIngredients({ type: 'SET', ingredients: filterIngredients})
  }, []);

  const changeLoadingandErrorHandler = useCallback( (flag, err) => {
    flag? dispatchHttp({type: 'SEND'}): dispatchHttp({type: 'ERROR', error: err});
    // setLoadingState(flag);
    // error && setErrorState(error);
  }, []);


  const addIngredientHandler = useCallback( ingredient => {
    // setLoadingState(true);
    dispatchHttp({type: 'SEND'});
    fetch('https://react-hooks-example-7ebcc-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'post',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' }
    })
    .then( response => response.json() )
    .then( responseData => {
        // setLoadingState(false);
        // setIngredientsState( prevIngredients => (
        //   [
        //     ...prevIngredients,
        //     {
        //       id: responseData.name,
        //       ...ingredient
        //     }
        //   ]
        // ));
        dispatchHttp({type: 'RESPONSE'});
        dispatchIngredients({type: 'ADD', ingredients: { id: responseData.name, ...ingredient}})
    })
    .catch( err => {
      // setErrorState(error);
      // setLoadingState(false);
      dispatchHttp({type: 'ERROR', error: err});
    })
  }, [])

  const removeItemHandler = useCallback( ingredientId => {
    // setLoadingState(true);
    dispatchHttp({type: 'SEND'});
    fetch(`https://react-hooks-example-7ebcc-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'delete'
    })
    .then( response => {
      // setLoadingState(false);
      // setIngredientsState( prevIngredients => (
      //   prevIngredients.filter( ingredients => ingredients.id !== ingredientId)
      // ))
      dispatchHttp({type: 'RESPONSE'});
      dispatchIngredients({ type: 'DELETE', id: ingredientId});
    })
    .catch( err => {
      // setErrorState(error);
      // setLoadingState(false);
      dispatchHttp({type: 'ERROR', error: err});
    })
  }, []);

  const clearError = () => {
    // setErrorState(null);
    dispatchHttp({type: 'CLEAR'});

  }

  return (
    <div className="App">
      { httpState.error ? <ErrorModal onClose={clearError}>{'Something Went Wrong!!!'}</ErrorModal>: null}
      <IngredientForm onAddIngredients={addIngredientHandler} loading={httpState.loading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} onChangeLoadingandError={ changeLoadingandErrorHandler  } />
        <IngredientList ingredients={ingredientsState} onRemoveItem={removeItemHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
