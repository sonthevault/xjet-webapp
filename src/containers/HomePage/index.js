import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { path } from "ramda";
class HomePage extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/user");
    } else {
      this.props.history.push("/login");
    }
  }

  onApplyButtonClick = () => {
    this.props.history.push("/signup");
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: path(["auth", "data", "token", "accessToken"], state)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(HomePage)
);
