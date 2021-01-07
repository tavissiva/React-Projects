import React from 'react';

import styles from './Order.module.css';

const order = ( props ) => {

    const ingredients = [];
    for( let ingredientName in props.ingredients ) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    const ingredientOutput = ingredients.map( ig => (
                                <span 
                                    key={ ig.name }
                                    style={{
                                        textTransform: 'capitalize', 
                                        padding: '3px 5px',
                                        display: 'inline-block',
                                        margin: '0 8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '3px'}}>
                                        {ig.name} { <span style={{fontStyle:'italic'}}> ({ig.amount}) </span> }
                                </span>
                            ));

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>USD { props.price.toFixed(2)}</strong></p>
        </div>
    );

};

export default order;