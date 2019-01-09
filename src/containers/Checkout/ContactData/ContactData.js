import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../../store/actions/index";
import {checkValidity} from '../../../shared/validation';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    console.log(updatedFormElement);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    updatedFormElement.touched = true;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  orderHandler = event => {
    event.preventDefault();
    // this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //   });
    // console.log(this.props.ingredients);
    this.props.onOrderBurger(order, this.props.token);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formEl => (
          <Input
            key={formEl.id}
            elementType={formEl.config.elementType}
            elementConfig={formEl.config.elementConfig}
            value={formEl.config.value}
            invalid={!formEl.config.valid}
            shouldValidate={formEl.config.validation}
            touched={formEl.config.touched}
            changed={event => {
              this.inputChangedHandler(event, formEl.id);
            }}
          />
        ))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}
        >
          PLACE YOUR ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Details</h4>
        {form}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
