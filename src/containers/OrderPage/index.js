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
    this.getOrder();
  }

  componentWillUnmount() {}

  updateOrder = txHash => {
    const body = {
      txHash
    };
    API.updateOrder(body)
      .then(response => {
        switch (response.status) {
          case 200:
            this.setState({
              status: "success",
              message: "Bitcoin transaction hash has been updated successfully."
            });
            window.scrollTo(0, 0);

            setTimeout(() => {
              window.location.reload();
            }, 1000);
            break;
          default:
            break;
        }
      })
      .catch(error => {});
  };

  getOrder = () => {
    API.getOrder()
      .then(response => {
        switch (response.status) {
          case 200:
            const orderData = path(["data", "order"], response);
            this.setState({
              orderData
            });
            break;
          default:
            break;
        }
      })
      .catch(error => {});
  };

  render() {
    const { t, user } = this.props;
    const { status, message, orderData } = this.state;

    return (
      <Formik
        initialValues={{
          email: user.email || "",
          xjetUserId: orderData ? orderData.xjetUserId : "",
          senderBTCAddress: orderData ? orderData.senderBTCAddress : "",
          amount: orderData ? orderData.amount : null,
          txHash: orderData ? orderData.txHash : ""
        }}
        enableReinitialize={true}
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

          if (!values.xjetUserId) {
            errors.xjetUserId = "Required";
          }

          if (!values.senderBTCAddress) {
            errors.senderBTCAddress = "Required";
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
                    message: "Your order has been submitted successfully."
                  });
                  window.scrollTo(0, 0);

                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                  break;
                case 400:
                case 401:
                  let message =
                    path(["data", "message"], response) ||
                    "An error has been occurred. Please contact us";
                  this.setState({
                    status: "danger",
                    message: message
                  });
                  window.scrollTo(0, 0);
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
            orderData={orderData}
            updateOrder={this.updateOrder}
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
