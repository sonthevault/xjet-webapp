import React, { Component } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  FormFeedback
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";

class AccountSetting extends Component {
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

    // console.log("errors", errors.email);

    return (
      <>
        <SimpleHeader name={t("title")} />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader>
              <h3 className="mb-0">{t("title")}</h3>
            </CardHeader>
            <CardBody>
              {message && <Alert color={status}>{message}</Alert>}

              <Form>
              {/*  Sign up time */}
              <Row>
                  <Col md="12">
                    <label>Sign up date and time</label>
                    <FormGroup>
                      <InputGroup
                        className={classnames("input-group-merge", {
                          focused: this.state.createdAt
                        })}
                      >
                        <Input
                          type="text"
                          name="createdAt"
                          value={values["createdAt"]}
                          disabled
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>


                {/*  Field user name */}
                <Row>
                  <Col md="12">
                    <label>Username</label>
                    <FormGroup>
                      <InputGroup
                        className={classnames("input-group-merge", {
                          focused: this.state.username
                        })}
                      >
                        <Input
                          type="text"
                          name="username"
                          value={values["username"]}
                          disabled
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                {/*  Field email */}
                <Row>
                  <Col md="12">
                    <label>Email</label>
                    <FormGroup>
                      <InputGroup
                        className={classnames("input-group-merge", {
                          focused: this.state.email
                        })}
                      >
                        <Input
                          type="text"
                          name="email"
                          value={values["email"]}
                          disabled
                        />
                      </InputGroup>
                      {errors.email && (
                        <FormFeedback>{errors.email}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {/*  Field contact number */}
                <Row>
                  <Col md="12">
                    <label>Mobile Number</label>
                    <FormGroup>
                      <InputGroup
                        className={classnames("input-group-merge", {
                          focused: this.state.contactNumber
                        })}
                      >
                        <Input
                          type="text"
                          name="phone"
                          value={values["phone"]}
                          disabled
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                {/*  Field contact number */}
                <Row>
                  <Col md="12">
                    <label>Referral Code</label>
                    <FormGroup>
                      <InputGroup
                      >
                        <Input
                          type="text"
                          name="referralCode"
                          value={values["referralCode"]}
                          disabled
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default AccountSetting;
