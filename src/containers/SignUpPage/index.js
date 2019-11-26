import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import i18n from "i18next";
import { compose } from "recompose";
import { Formik } from "formik";
import { register } from "../../redux/actions";
import RegisterPage from "../../components/RegisterPage";
import API from "../../network/API";
import { path, pathOr } from "ramda";
import qs from "query-string";
class SignUpPageContainer extends Component {
  state = {ref: ''};

  componentDidMount() {
    document.body.classList.add("bg-default");

    const query = qs.parse(this.props.location.search);
    if (query.ref) {
      this.setState({ref: query.ref})
    }
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  onNavigationSignInClick = () => {
    this.props.history.push("/login");
  }

  render() {
    const { t } = this.props;
    const { status, message, ref } = this.state;

    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmationPassword: "",
          username: "",
          phone: "",
          ref: ref || "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnSubmit
        enableReinitialize
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          }

          if (!values.confirmationPassword) {
            errors.password = "Required";
          }

          if (values.password !== values.confirmationPassword) {
            errors.confirmationPassword = "Password not matched";
          }

          if (!values.username) {
            errors.username = "Required";
          }

          if (!values.phone) {
            errors.phone = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const body = {
            email: values["email"],
            username: values["username"],
            phone: values["phone"],
            password: values["password"],
            ref: values["ref"]
          };

          this.setState({ message: "" });

          API.register(body)
            .then(response => {
              setSubmitting(false);

              console.log("REGISTER", response);

              switch (response.status) {
                case 201:
                  this.setState({
                    status: "success",
                    message:
                      "Your registration has been submitted successfully. Please check your email to activate your account"
                  });
                  window.scrollTo(0, 0);
                  break;
                case 409:
                  console.log("errors", response);
                  const errors = pathOr([], ["response", "errors"], response);
                  const emailExisted = errors.filter(
                    error => error.field === "email"
                  );
                  if (emailExisted) {
                    this.setState({
                      status: "danger",
                      message: "Email is already existed"
                    });
                  }
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
          <RegisterPage
            formik={formik}
            t={t}
            status={status}
            message={message}
            onNavigationSignInClick={this.onNavigationSignInClick}
          />
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: false
  };
};

export default compose(
  withNamespaces("signup", { wait: true }),
  withRouter,
  connect(
    mapStateToProps,
    {
      register
    }
  )
)(SignUpPageContainer);
