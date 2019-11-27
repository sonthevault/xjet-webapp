import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { pathOr, path } from "ramda";
import { login } from "../../redux/actions";

import Airdrop from "../../components/Airdrop";

class ReferralContainer extends Component {

  render() {
    const { t, user } = this.props;

    return (
      <Airdrop user={user}> 
      </Airdrop>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: path(["auth", "data", "user"], state)
  };
};

export default compose(
  withNamespaces("core", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {
      
    }
  )
)(ReferralContainer);
