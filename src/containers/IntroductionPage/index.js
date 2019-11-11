import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { path } from "ramda";

import Introduction from "../../components/Introduction";

class IntroductionPageContainer extends Component {


  render() {
    const { t } = this.props;

    return <Introduction t={t} />;
  }
}

const mapStateToProps = state => {
  return {
    user: path(["auth", "data", "user"], state)
  };
};

export default compose(
  withNamespaces("introduction", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {
    }
  )
)(IntroductionPageContainer);
