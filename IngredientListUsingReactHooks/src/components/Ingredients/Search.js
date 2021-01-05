import React, { useEffect, useState, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients, onChangeLoadingandError } = props;
  const [ enteredFilter, setEnteredFilter ] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if( enteredFilter === inputRef.current.value ){
        onChangeLoadingandError(true, null);
        const query = enteredFilter.length === 0 ? '': `?orderBy="name"&equalTo="${enteredFilter}"`;
        fetch('https://react-hooks-example-7ebcc-default-rtdb.firebaseio.com/ingredients.json'+query)
         .then( response => response.json() )
         .then( responseData => {
          onChangeLoadingandError(false, null);
           const loadedIngredients = [];
           for(const key in responseData){
             loadedIngredients.push({
               id: key,
               name: responseData[key].name,
               amount: responseData[key].amount
             })
           }
           onLoadIngredients(loadedIngredients);
         })
         .catch( err => {
          onChangeLoadingandError(false, err);
         })
      }
    }, 500);

    return () => { clearTimeout(timer) }
  }, [enteredFilter, onLoadIngredients, onChangeLoadingandError]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Name</label>
          <input 
            ref = { inputRef }
            type="text" 
            value={enteredFilter} 
            onChange={ event => setEnteredFilter(event.target.value)}
            />
        </div>
      </Card>
    </section>
  );
});

export default Search;
