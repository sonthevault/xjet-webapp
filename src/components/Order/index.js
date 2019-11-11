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
  CardHeader
} from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader.jsx";
import SimpleHeader from "components/Headers/SimpleHeader.jsx";

import "./index.css";

class OrderPage extends Component {
  state = {};

  onKeyDown = e => {
    const { submitForm } = this.props.formik;
    if (e.key === "Enter") {
      submitForm();
    }
  };

  convertMedbToBTC = amount => {
    if (!amount || isNaN(amount)) {
      return 0;
    }

    const medbAmount = parseInt(amount);
    const btcAmount = parseFloat(
      Math.round((medbAmount) * 0.01 * 100) / 100
    ).toFixed(2);
    return btcAmount;
  };

  getTotalMedb = amount => {
    if (!amount || isNaN(amount)) {
      return 0;
    }
    const medbAmount = parseInt(amount) * 10000;
    return medbAmount;
  }

  addCommas = nStr => {
    nStr += "";
    var x = nStr.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  };

  render() {
    const { formik, t, status, message, orderData, updateOrder } = this.props;

    console.log("orderData", orderData);
    let orderStatus = "Waiting for transfer BTC";
    if (orderData) {
      orderStatus =
        orderData.status === "pending"
          ? "Waiting for transfer BTC"
          : "Confirmed";
    }

    const { isSubmitting, errors, submitForm, values, setFieldValue } = formik;

    console.log("Formik-errors", errors);

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
              {/* ======================== Start Personal Details PART ==========================*/}
              {orderData && <h2>{`Order Status: ${orderStatus}`}</h2>}
              <h2>1. User Info</h2>
              <Form role="form">
                <label>1. Email</label>
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
                      disabled
                    />
                    {errors.email && (
                      <FormFeedback>{errors.email}</FormFeedback>
                    )}
                  </InputGroup>
                </FormGroup>

                <label>2. Registered User email address of XJET.io</label>
                <FormGroup
                  className={classnames({
                    focused: this.state.focusedUserId
                  })}
                >
                  <InputGroup className="input-group-merge input-group-alternative">
                    <Input
                      placeholder={t("user-id")}
                      type="text"
                      name={"xjetUserId"}
                      value={values["xjetUserId"]}
                      onChange={e => {
                        setFieldValue("xjetUserId", e.target.value);
                      }}
                      onFocus={() => this.setState({ focusedUserId: true })}
                      onBlur={() =>
                        this.setState({
                          focusedUserId: false
                        })
                      }
                      invalid={errors.xjetUserId ? true : false}
                      disabled={isSubmitting}
                      onKeyDown={this.onKeyDown}
                    />

                    {errors.xjetUserId && (
                      <FormFeedback>{errors.xjetUserId}</FormFeedback>
                    )}
                  </InputGroup>
                </FormGroup>

                <h2>2. Token Order Info</h2>
                <label>
                  How Many ‘MEDB’ Token Want To Buy? Example: 10,000 MEDB =
                  0.01BTC = 10,000 JPY
                </label>
                <div>
                  <p class="highlight-red">
                    Minimum number of MEDB token purchase is 20,000 MEDB
                    (=0.02BTC)
                  </p>
                </div>
                <Row>
                  <Col>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedAmount
                      })}
                    >
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
                          disabled={isSubmitting || orderData}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.amount && (
                          <FormFeedback>{errors.amount}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col>
                    <span class="align-middle">
                      {`x 10,000 MEDB = `}<span class="btcAmount">{`${this.addCommas(this.getTotalMedb(values["amount"]))} MEDB = ${this.addCommas(this.convertMedbToBTC(values["amount"]))} BTC`}</span>
                    </span>
                  </Col>
                </Row>

                <br />
                <h2>3. User’s Bitcoin Wallet Address</h2>

                <label>
                  Please fill up your bitcoin wallet address below input field.
                  Once we receive bitcoin amount from your bitcoin address will
                  update purchase status
                </label>
                <FormGroup
                  className={classnames({
                    focused: this.state.focusedSenderBTCAddress
                  })}
                >
                  <div>
                    <p class="highlight">Bitcoin Wallet Address </p>
                  </div>

                  <InputGroup className="input-group-merge input-group-alternative">
                    <Input
                      placeholder={t("sender-bitcoin-address")}
                      type="text"
                      name={"senderBTCAddress"}
                      value={values["senderBTCAddress"]}
                      onChange={e => {
                        setFieldValue("senderBTCAddress", e.target.value);
                      }}
                      onFocus={() =>
                        this.setState({ focusedSenderBTCAddress: true })
                      }
                      onBlur={() =>
                        this.setState({
                          focusedSenderBTCAddress: false
                        })
                      }
                      invalid={errors.senderBTCAddress ? true : false}
                      disabled={isSubmitting}
                      onKeyDown={this.onKeyDown}
                    />

                    {errors.senderBTCAddress && (
                      <FormFeedback>{errors.senderBTCAddress}</FormFeedback>
                    )}
                  </InputGroup>
                </FormGroup>

                <br />
                {orderData ? (
                  <>
                    <h2>
                      {`Please transfer ${this.addCommas(this.convertMedbToBTC(values["amount"]))} BTC to Bloodlink Bitcoin wallet address
                      and update bitcoin transaction number as below:`}
                    </h2>

                    <label>Bitcoin transaction number</label>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedUserId
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          placeholder={"BTC Transaction Hash"}
                          type="text"
                          name={"txHash"}
                          value={values["txHash"]}
                          onChange={e => {
                            setFieldValue("txHash", e.target.value);
                          }}
                          onFocus={() => this.setState({ focusedTxHash: true })}
                          onBlur={() =>
                            this.setState({
                              focusedTxHash: false
                            })
                          }
                          invalid={errors.txHash ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.txHash && (
                          <FormFeedback>{errors.txHash}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>
                    <div>
                      <div>
                        <h2>Bloodlink BTC Address</h2>
                        <div class="btc-wallet">3Gpx4EEY5GLYPGzySjYLtebcYB7UjouXP9</div>
                        <img
                          src={require("../../assets/img/btc_wallet_address.jpeg")}
                          alt="Bloodlink BTC Wallet Address"
                        />
                      </div>
                      <Button
                        className="mt-4"
                        color="info"
                        type="button"
                        onClick={() => updateOrder(values["txHash"])}
                        disabled={isSubmitting}
                      >
                        Update
                      </Button>
                    </div>
                  </>
                ) : (
                  <div>
                    <div>
                      <h2>Bloodlink BTC Address</h2>
                        <div class="btc-wallet">3Gpx4EEY5GLYPGzySjYLtebcYB7UjouXP9</div>
                      <img
                        src={require("../../assets/img/btc_wallet_address.jpeg")}
                        alt="Bloodlink BTC Wallet Address"
                      />
                    </div>
                    <Button
                      className="mt-4"
                      color="info"
                      type="button"
                      onClick={submitForm}
                      disabled={isSubmitting}
                    >
                      Order
                    </Button>
                  </div>
                )}
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default OrderPage;
