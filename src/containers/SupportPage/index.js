import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";

class SupportPageContainer extends Component {
  state = {};

  openInNewTab  = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  componentDidMount() {
    this.openInNewTab("https://xjet.zendesk.com/");
  }

  componentWillUnmount() {
  }

  render() {
    return null
  }
}

export default compose(
  withNamespaces("order", { wait: true }),
  withRouter,
)(SupportPageContainer);
