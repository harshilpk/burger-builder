import React from "react";

import classes from "./Order.css";

const order = props => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ig => {
      return <span 
      style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #000', padding: '5px'}}
      key={ig.name}>{ig.name} ({ig.amount})</span>;
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        rice: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
