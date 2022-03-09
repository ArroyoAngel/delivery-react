import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Main extends Component {
  render(): React.ReactNode {
    return <Redirect to="/app" />
  }
}
export default Main;