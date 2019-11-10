import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { pathOr, path } from "ramda";
import qs from "query-string";

import EmailConfirmation from "../../components/EmailConfirmation";
import API from "../../network/API";

class EmailConfirmationPageContainer extends Component {
  state = {
    status: "",
    message: "",
    isLoading: false
  };

  componentDidMount() {
    document.body.classList.add("bg-default");

    const query = qs.parse(this.props.location.search);
    if (query.token) {
      this.setState({ isLoading: true });

      API.confirmEmail(query.token)
        .then(response => {
          this.setState({
            isLoading: false
          });

          switch (response.status) {
            case 200:
              const successMessage = path(["data", "message"], response);
              this.setState({
                status: "success",
                message: successMessage
              });
              break;
            default:
              const message =
                path(["data", "message"], response) || "Unknown error";
              this.setState({
                status: "danger",
                message: message
              });
              break;
          }
        })
        .catch(error => {
          this.setState({
            status: "danger",
            message: error.message,
            isLoading: false
          });
        });
    }
  }

  componentWillMount() {
    this.setState({
      status: pathOr("", ["location", "state", "status"], this.props),
      message: pathOr("", ["location", "state", "message"], this.props)
    });
    this.props.history.replace({
      pathname: "/confirmation",
      state: {}
    });
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  onClickSignIn = () => {
    this.props.history.push("/login");
  };

  render() {
    const { t } = this.props;
    const { status, message, isLoading } = this.state;

    return (
      <EmailConfirmation
        onClickSignIn={this.onClickSignIn}
        t={t}
        status={status}
        message={message}
        isLoading={isLoading}
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default compose(
  withNamespaces("reset-password", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {}
  )
)(EmailConfirmationPageContainer);
