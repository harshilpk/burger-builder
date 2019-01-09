import React, { Component } from "react";

import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextprops, nextState) {
    if (nextprops.show !== this.props.show || nextprops.children !== this.props.children) {
      return true;
    }
    return false;
  }

  componentWillUpdate () {
      // console.log('[Modal] WillUpdate');
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opcaity: this.props.show ? "1" : "0"
          }}
          className={classes.Modal}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
