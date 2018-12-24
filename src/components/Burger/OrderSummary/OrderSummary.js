import React from "react";

import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span  style={{ textTransform: "capitalize" }}>
          {igKey} 
        </span>
        : {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>
        You are about to order a delicious burger with the following
        ingredients:
      </p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </>
  );
};

export default orderSummary;
