import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { logout } from "redux/actions";

class LogoutPageContainer extends Component {
  state = {};

  openInNewTab = url => {
    var win = window.open(url, "_blank");
    win.focus();
  };

  componentDidMount() {
    this.props.logout();
    this.props.history.push("/");
  }

  componentWillUnmount() {}

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {

}

export default compose(
  withNamespaces("order", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {
      logout
    }
  )
)(LogoutPageContainer);
