import React, { Component } from "react";

// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  FormFeedback,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  Media,
  Modal,
  ModalBody,
  ModalFooter,
  NavLink
} from "reactstrap";
import DatePicker from "react-datetime";

import AuthHeader from "components/Headers/AuthHeader.jsx";
import LoadingButton from "components/LoadingButton";
import API from "../../network/API";
import { path } from "ramda";

import "./index.css";

class RegisterPage extends Component {
  state = {};

  componentDidMount = () => {
    const { formik, t, status, message } = this.props;
  };

  onKeyDown = e => {
    const { submitForm } = this.props.formik;
    if (e.key === "Enter") {
      submitForm();
    }
  };


  render() {
    const { formik, t, status, message, onNavigationSignInClick } = this.props;

    const {
      isSubmitting,
      touched,
      errors,
      submitForm,
      values,
      setFieldValue
    } = formik;

    console.log("Formik-errors", errors);

    return (
      <>
        <AuthHeader title="XJET.IO" lead={t("create-new-account")} />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="8">
              {message && <Alert color={status}>{message}</Alert>}
              <Card className="bg-secondary border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  {/* ======================== Start Personal Details PART ==========================*/}
                  <h2>Sign Up</h2>
                  <p>
                    Please sign up with a registered Xjet email address to apply
                    exchange tokens to bloodlink's 'MEDB' token
                  </p>

                  <br />

                  <Form role="form">
                    <label>User Name</label>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedUsername
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <Input
                          type="text"
                          name={"username"}
                          value={values["username"]}
                          onChange={e => {
                            setFieldValue("username", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedUsername: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedUsername: false })
                          }
                          invalid={errors.username ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />
                        {errors.username && (
                          <FormFeedback>{errors.username}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <label>Email Address</label>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedEmail
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <Input
                          type="email"
                          name={"email"}
                          value={values["email"]}
                          onChange={e => {
                            setFieldValue("email", e.target.value);
                          }}
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
                          invalid={errors.email ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />
                        {errors.email && (
                          <FormFeedback>{errors.email}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <label>Password</label>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          placeholder={t("password")}
                          type="password"
                          name={"password"}
                          value={values["password"]}
                          onChange={e => {
                            setFieldValue("password", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedPassword: true })
                          }
                          onBlur={() =>
                            this.setState({
                              focusedPassword: false
                            })
                          }
                          invalid={errors.password ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.password && (
                          <FormFeedback>{errors.password}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <label>Re-Password</label>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedConfirmationPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          placeholder={t("confirmation-password")}
                          type="password"
                          name={"confirmationPassword"}
                          value={values["confirmationPassword"]}
                          onChange={e => {
                            setFieldValue(
                              "confirmationPassword",
                              e.target.value
                            );
                          }}
                          onFocus={() =>
                            this.setState({ focusedConfirmationPassword: true })
                          }
                          onBlur={() =>
                            this.setState({
                              focusedConfirmationPassword: false
                            })
                          }
                          invalid={errors.confirmationPassword ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.confirmationPassword && (
                          <FormFeedback>
                            {errors.confirmationPassword}
                          </FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <label>Mobile Number</label>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedPhone
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <Input
                          type="text"
                          name={"phone"}
                          value={values["phone"]}
                          onChange={e => {
                            setFieldValue("phone", e.target.value);
                          }}
                          onFocus={() => this.setState({ focusedPhone: true })}
                          onBlur={() => this.setState({ focusedPhone: false })}
                          invalid={errors.phone ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />
                        {errors.phone && (
                          <FormFeedback>{errors.phone}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <Row>
                      <Col>
                        <Button
                          size="lg"
                          block
                          color="info"
                          type="button"
                          onClick={submitForm}
                          disabled={isSubmitting}
                        >
                          Submit
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          size="lg"
                          block
                          color="link"
                          type="button"
                          onClick={onNavigationSignInClick}
                        >
                          <u>Sign In</u>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default RegisterPage;
