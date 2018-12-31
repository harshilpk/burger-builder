import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.css';

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope you enjoy your burger!!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked btnType="Danger">
        CANCEL
      </Button>
      <Button clicked btnType="Success">
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
