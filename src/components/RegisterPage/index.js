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
  Media
} from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader.jsx";

import styles from "./index.module.css";

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

                    {/* ======================== Start Personal Details PART ==========================*/}
                    <h2>Personal Details</h2>

                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedNationality
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
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
                          focused: this.state.focusedFirstName
                        })}
                      >
                        <InputGroup className="input-group-merge input-group-alternative">
                          <Input
                            placeholder={"First name"}
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
                      <FormGroup
                        className={classnames({
                          focused: this.state.focusedLastName
                        })}
                      >
                        <InputGroup className="input-group-merge input-group-alternative">
                          <Input
                            placeholder={"Last name"}
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
                    </div>

                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedAddress
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          placeholder={"Address"}
                          type="text"
                          name={"address"}
                          value={values["address"]}
                          onChange={e => {
                            setFieldValue("address", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedAddress: true })
                          }
                          onBlur={() =>
                            this.setState({
                              focusedAddress: false
                            })
                          }
                          invalid={errors.address ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.address && (
                          <FormFeedback>{errors.address}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedIdentityNumber
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
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

                    <div class="d-flex align-items-start">
                      <h4>Gender</h4>
                      <Col></Col>
                      <Col>
                        <label>
                          <Input
                            type="radio"
                            name={"gender"}
                            checked={values["gender"] === "male"}
                            value="male"
                            onChange={e => {
                              setFieldValue("gender", "male");
                            }}
                            disabled={isSubmitting}
                          />
                          Male
                        </label>
                      </Col>

                      <Col>
                        <label>
                          <Input
                            type="radio"
                            name={"gender"}
                            checked={values["gender"] === "female"}
                            value="female"
                            onChange={e => {
                              setFieldValue("gender", "female");
                            }}
                            disabled={isSubmitting}
                          />
                          Female
                        </label>
                      </Col>
                    </div>

                    {/* ======================== End Personal Details PART ==========================*/}

                    <br />

                    {/* ======================== Start Document Upload PART ==========================*/}
                    <h2>Identification Documents</h2>

                    <h4>Photo Requirements</h4>
                    <Row>
                      <Col xs="6">
                        The image must be of high quality and unobstructed
                      </Col>
                      <Col xs="3">No larger than 10mb in size</Col>
                      <Col xs="3">Format: jpg, png, jpeg</Col>
                    </Row>

                    <br />

                    <h4>a photo of the front of your valid ID</h4>
                    <label>
                      Upload the front page of your valid ID and the image must
                      be clear.
                    </label>
                    <Row>
                      <Col>
                        <Media
                          width="75%"
                          object
                          src={require("assets/img/identity_placeholder.png")}
                          alt="Generic placeholder image"
                        />
                      </Col>
                      <Col className={styles.uploadPlaceholder}>
                        <i class="fa fa-upload" aria-hidden="true">
                          Upload
                        </i>
                      </Col>
                      <Input
                        type="hidden"
                        name={"identityCardPicture"}
                        value={values["identityCardPicture"]}
                      ></Input>
                    </Row>

                    <br />

                    <h4>Picture of you holding front page of your valid ID</h4>
                    <label>
                      Please upload you holding the front page of your valid ID
                      (Blurred image not acceptable). Note: name, exchange name,
                      application date
                    </label>
                    <Row>
                      <Col>
                        <Media
                          width="75%"
                          object
                          src={require("assets/img/holding_identity_placeholder.png")}
                          alt="Generic placeholder image"
                        />
                      </Col>
                      <Col className={styles.uploadPlaceholder}>
                        <i class="fa fa-upload" aria-hidden="true">
                          Upload
                        </i>
                      </Col>
                      <Input
                        type="hidden"
                        name={"holdingIdentityCardPicture"}
                        value={values["holdingIdentityCardPicture"]}
                      ></Input>
                    </Row>

                    <h4>Proof of Address</h4>
                    <label>
                      Utility Bill/Telephone Bill/Bank Statement (Must be not
                      more than 3 months old.).
                    </label>
                    <Row>
                      <Col>
                        <Media
                          width="75%"
                          object
                          src={require("assets/img/holding_identity_placeholder.png")}
                          alt="Generic placeholder image"
                        />
                      </Col>
                      <Col className={styles.uploadPlaceholder}>
                        <i class="fa fa-upload" aria-hidden="true">
                          Upload
                        </i>
                      </Col>
                      <Input
                        type="hidden"
                        name={"proofOfAddressPicture"}
                        value={values["proofOfAddressPicture"]}
                      ></Input>
                    </Row>

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
