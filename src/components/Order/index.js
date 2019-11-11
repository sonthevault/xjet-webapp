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

  componentDidMount = () => {
    this.convertMedbToBTC();
  };

  onKeyDown = e => {
    const { submitForm } = this.props.formik;
    if (e.key === "Enter") {
      submitForm();
    }
  };

  convertMedbToBTC = (amount) => {
    if (!amount || isNaN(amount)) {
      this.setState({
        btcAmount: 0
      })
      return;
    }

    const medbAmount = parseInt(amount);
    const btcAmount = parseFloat(Math.round((medbAmount / 10000 * 0.01) * 100) / 100).toFixed(2)
    this.setState({btcAmount})
  }

  addCommas = (nStr) => {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

  render() {
    const { formik, t, status, message } = this.props;

    const {
      isSubmitting,
      errors,
      submitForm,
      values,
      setFieldValue
    } = formik;

    const { btcAmount } = this.state;

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

                <label>2. User ID at XJET.IO</label>
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
                            this.convertMedbToBTC(e.target.value);
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
                  </Col>
                  <Col>
                        <span class="align-middle">MEDB = <span>{this.addCommas(btcAmount)}BTC</span></span>
                  </Col>
                </Row>

                <br />
                <h2>3. User’s Bitcoin Wallet Address</h2>

                <label>
                  Pls, fill up your bitcoin wallet address below input field.
                </label>
                <label>
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
                <div>
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
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default OrderPage;
