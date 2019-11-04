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

class SignUpPageContainer extends Component {
  state = {};

  componentDidMount() {
    document.body.classList.add("bg-default");
    this.props.history.push("/signup");
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
          password: "",
          confirmationPassword: "",
          gender: "male",
          address: "",
          nationality: "",
          firstName: "",
          lastName: "",
          birthday: "",
          identityNumber: "",
          identityType: "passport",
          identityCardPicture: "",
          proofOfAddressPicture: ""
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

          if (!values.password) {
            errors.password = "Required";
          }

          if (!values.confirmationPassword) {
            errors.password = "Required";
          }

          if (values.password !== values.confirmationPassword) {
            errors.confirmationPassword = "Password not matched";
          }

          if (!values.nationality) {
            errors.toc = "Required";
          }

          if (!values.firstName) {
            errors.firstName = "Required";
          }

          if (!values.lastName) {
            errors.lastName = "Required";
          }

          if (!values.identityNumber) {
            errors.identityNumber = "Required";
          }

          if (!values.identityCardPicture) {
            errors.identityCardPicture = "Required";
          }

          if (!values.proofOfAddressPicture) {
            errors.proofOfAddressPicture = "Required";
          }

          // if (!values.toc) {
          //   errors.toc = "Required";
          // }

          console.log(errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const body = {
            email: values["email"],
            password: values["password"],
            personalInfo: {
              firstName: values["firstName"],
              lastName: values["lastName"],
              address: values["address"],
              identityNumber: values["identityNumber"],
              identityType: values["identityType"],
              nationality: values["nationality"],
              gender: values["gender"],
              birthday: values["birthday"]
            },
            documents: {
              identityPicture: values["identityCardPicture"],
              proofOfAddressPicture: values["proofOfAddressPicture"]
            }
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
                      "Your registration submitted successfully, We will update your registration status after process KYC in a week."
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
