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
  Alert
} from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader.jsx";

class RegisterPage extends Component {
  state = {};

  onKeyDown = e => {
    const { submitForm } = this.props.formik;
    if (e.key === "Enter") {
      submitForm();
    }
  };

  render() {
    const { formik, t, status, message } = this.props;

    const {
      isSubmitting,
      touched,
      errors,
      submitForm,
      values,
      setFieldValue
    } = formik;

    return (
      <>
        <AuthHeader title="XJET.IO" lead={t("create-new-account")} />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="8">
              {message && <Alert color={status}>{message}</Alert>}
              <Card className="bg-secondary border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <h2>{t("sign-up-label")}</h2>
                  </div>
                  <Form role="form">
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedEmail
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={t("email")}
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
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
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

                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedConfirmationPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
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

                    <h2>ID Verification</h2>

                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedNationality
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={"Nationality"}
                          type="text"
                          name={"nationality"}
                          value={values["nationality"]}
                          onChange={e => {
                            setFieldValue("nationality", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedNationality: true })
                          }
                          onBlur={() =>
                            this.setState({
                              focusedNationality: false
                            })
                          }
                          invalid={errors.nationality ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.nationality && (
                          <FormFeedback>{errors.nationality}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <div class="d-flex justify-content-between">
                      <FormGroup
                        className={classnames({
                          focused: this.state.focusedLastName
                        })}
                      >
                        <InputGroup className="input-group-merge input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={"First name"}
                            type="text"
                            name={"lastName"}
                            value={values["lastName"]}
                            onChange={e => {
                              setFieldValue("lastName", e.target.value);
                            }}
                            onFocus={() =>
                              this.setState({ focusedLastName: true })
                            }
                            onBlur={() =>
                              this.setState({
                                focusedLastName: false
                              })
                            }
                            invalid={errors.lastName ? true : false}
                            disabled={isSubmitting}
                            onKeyDown={this.onKeyDown}
                          />

                          {errors.lastName && (
                            <FormFeedback>{errors.lastName}</FormFeedback>
                          )}
                        </InputGroup>
                      </FormGroup>

                      <FormGroup
                        className={classnames({
                          focused: this.state.focusedFirstName
                        })}
                      >
                        <InputGroup className="input-group-merge input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder={"Last name"}
                            type="text"
                            name={"firstName"}
                            value={values["firstName"]}
                            onChange={e => {
                              setFieldValue("firstName", e.target.value);
                            }}
                            onFocus={() =>
                              this.setState({ focusedFirstName: true })
                            }
                            onBlur={() =>
                              this.setState({
                                focusedFirstName: false
                              })
                            }
                            invalid={errors.firstName ? true : false}
                            disabled={isSubmitting}
                            onKeyDown={this.onKeyDown}
                          />

                          {errors.firstName && (
                            <FormFeedback>{errors.firstName}</FormFeedback>
                          )}
                        </InputGroup>
                      </FormGroup>
                    </div>

                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedIdentityNumber
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={"ID Number"}
                          type="text"
                          name={"identifyNumber"}
                          value={values["identifyNumber"]}
                          onChange={e => {
                            setFieldValue("identifyNumber", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedIdentityNumber: true })
                          }
                          onBlur={() =>
                            this.setState({
                              focusedIdentityNumber: false
                            })
                          }
                          invalid={errors.identifyNumber ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.identifyNumber && (
                          <FormFeedback>{errors.identifyNumber}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <div class="d-flex justify-content-between">
                      <h3>Gender</h3>

                      <FormGroup>
                        <InputGroup className="input-group-merge input-group-alternative">
                          <Input
                            type="radio"
                            name={"gender"}
                            checked={values["gender"]}
                            onChange={e => {
                              setFieldValue("gender", e.target.value);
                            }}
                            disabled={isSubmitting}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>Male</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>

                      <FormGroup>
                        <InputGroup className="input-group-merge input-group-alternative">
                          <Input
                            type="radio"
                            name={"gender"}
                            checked={values["gender"]}
                            onChange={e => {
                              setFieldValue("gender", e.target.value);
                            }}
                            disabled={isSubmitting}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>Female</InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </div>

                    <Row className="my-4">
                      <Col xs="12">
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="customCheckRegister"
                            type="checkbox"
                            checked={values["toc"]}
                            onChange={e => {
                              setFieldValue("toc", e.target.value);
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheckRegister"
                          >
                            <span className="text-muted">
                              {t("toc-1")}{" "}
                              <a
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                {t("toc-2")}
                              </a>
                            </span>
                          </label>
                        </div>
                        <Input
                          invalid={errors.toc ? true : false}
                          type="hidden"
                          value={values["toc"]}
                        />
                        {errors.toc && (
                          <FormFeedback>{errors.toc}</FormFeedback>
                        )}
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="info"
                        type="button"
                        onClick={submitForm}
                        disabled={isSubmitting}
                      >
                        {t("create-account")}
                      </Button>
                    </div>
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
