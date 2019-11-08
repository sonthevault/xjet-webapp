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
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  Media,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader.jsx";

import "./index.css";

class OrderPage extends Component {
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
    const { formik, t, status, message } = this.props;

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
            <Col lg="12" md="8">
              {message && <Alert color={status}>{message}</Alert>}
              <Card className="bg-secondary border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  {/* ======================== Start Personal Details PART ==========================*/}
                  <h2>Step 1</h2>
                  <p class="instruction">Register at XJET.io and submit ID card photo for KYC</p>

                  <br />

                  <h2>Step 2</h2>
                  <p class="instruction">Moving to below order link and fill up</p>

                  <Form role="form">
                    <label>Email registered at XJET.io</label>
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

                    <label>User ID at XJET.io</label>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedUserId
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          placeholder={t("user-id")}
                          type="text"
                          name={"userId"}
                          value={values["userId"]}
                          onChange={e => {
                            setFieldValue("userId", e.target.value);
                          }}
                          onFocus={() => this.setState({ focusedUserId: true })}
                          onBlur={() =>
                            this.setState({
                              focusedUserId: false
                            })
                          }
                          invalid={errors.userId ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.userId && (
                          <FormFeedback>{errors.userId}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <label>Amount purchase (Need calculator)</label>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedAmount
                      })}
                    >
                      <div>
                        <p class="highlight">
                          10,000 MEDB = 100USDT = 10,000 JPY
                        </p>
                      </div>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          placeholder={t("amount")}
                          type="text"
                          name={"amount"}
                          value={values["amount"]}
                          onChange={e => {
                            setFieldValue("amount", e.target.value);
                          }}
                          onFocus={() => this.setState({ focusedAmount: true })}
                          onBlur={() =>
                            this.setState({
                              focusedAmount: false
                            })
                          }
                          invalid={errors.amount ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.amount && (
                          <FormFeedback>{errors.amount}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <label>Sender USDT Address</label>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedSenderUsdtAddress
                      })}
                    >
                      <div>
                        <p class="highlight">
                          * Address transfer USDT: 0000000000000{" "}
                        </p>
                        <p class="highlight">
                          After we receive USDT from the sender address, we will
                          distribute reserved 'MEDB' token to you after public
                          token sales.
                        </p>
                      </div>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          placeholder={t("sender-usdt-address")}
                          type="text"
                          name={"senderUsdtAddress"}
                          value={values["senderUsdtAddress"]}
                          onChange={e => {
                            setFieldValue("senderUsdtAddress", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedSenderUsdtAddress: true })
                          }
                          onBlur={() =>
                            this.setState({
                              focusedSenderUsdtAddress: false
                            })
                          }
                          invalid={errors.senderUsdtAddress ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.senderUsdtAddress && (
                          <FormFeedback>
                            {errors.senderUsdtAddress}
                          </FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <br />
                    <h2>Step 3</h2>
                    <p class="instruction">Transfer BTC to below wallet address</p>
                    <p class="highlight">* Please check with Jaeyoung</p>
                    <br />
                    <div>
                      <Button
                        className="mt-4"
                        color="info"
                        type="button"
                        onClick={submitForm}
                        disabled={isSubmitting}
                      >
                        Submit
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

export default OrderPage;
