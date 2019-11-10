import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import i18n from "i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { register } from "../../redux/actions";
import OrderPage from "../../components/Order";
import API from "../../network/API";
import { path, pathOr } from "ramda";

class OrderPageContainer extends Component {
  state = {};

  componentDidMount() {
    document.body.classList.add("bg-default");
    // this.props.history.push("/signup");
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  render() {
    const { t } = this.props;
    const { status, message } = this.state;

    return (
      <Formik
        initialValues={{
          email: "",
          userId: "",
          senderUsdtAddress: "",
          amount: null,
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnSubmit
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.userId) {
            errors.userId = "Required";
          }

          if (!values.senderUsdtAddress) {
            errors.senderUsdtAddress = "Required";
          }

          if (!values.amount) {
            errors.amount = "Required";
          }

          if (isNaN(values.amount)) {
            errors.amount = "Amount must be a number";
          }

          if (values.amount <= 0) {
            errors.amount = "Amount must be greater than 0";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.setState({ message: "" });

          API.createOrder(values)
            .then(response => {
              setSubmitting(false);

              switch (response.status) {
                case 201:
                  this.setState({
                    status: "success",
                    message:
                      "Your order has been submitted successfully."
                  });
                  window.scrollTo(0, 0);
                  break;
                case 400:
                  this.setState({
                      status: "danger",
                      message: "An error has been occurred. Please contact us"
                    });
                  break;
                default:
                  break;
              }
            })
            .catch(error => {
              console.log("Exception", error);
            });
        }}
      >
        {formik => (
          <OrderPage
            formik={formik}
            t={t}
            status={status}
            message={message}
          />
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: false,
    user: path(["auth", "data", "user"], state)
  };
};

export default compose(
  withNamespaces("order", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {
      register
    }
  )
)(OrderPageContainer);