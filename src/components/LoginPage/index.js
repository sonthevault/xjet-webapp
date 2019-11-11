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
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./index.module.css";

class LoginPage extends Component {
  state = {};

  onKeyDown = e => {
    const { submitForm } = this.props.formik;
    if (e.key === "Enter") {
      submitForm();
    }
  };

  render() {
    const {
      formik,
      t,
      onClickForgotPassword,
      onClickCreateNewAccount,
      status,
      message
    } = this.props;

    const {
      isSubmitting,
      touched,
      errors,
      submitForm,
      values,
      setFieldValue
    } = formik;

    console.log("errors", errors.email);

    return (
      <>
        <AuthHeader title="XJET.IOn" lead="Admin dasboard" />
        <br />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col xs={10} sm={8} md={8} lg={8} className={styles.leftCol}>
              <h1 className={styles.leftHeadText}>
                Bloodlink project 'MEDB' Token Purchase Process
              </h1>
              <div>
                <div>Step 1.</div>
                <div>
                  Register account at XJET.io and submit ID card photo for KYC
                </div>
              </div>
              <div>
                <div>Step 2.</div>
                <div>
                  Register account token order page again and fill up the token
                  order form
                </div>
              </div>
              <div>
                <div>Step 3.</div>
                <div>Transfer BTC to Bloodlink BTC wallet address</div>
              </div>
              <div>
                <div>Bloodlinkプロジェクト「MEDB」トークン購入プロセス</div>
                <br />
                <div>ステップ1</div>
                <div>
                  XJET.ioでアカウントを登録し、身分証明書の写真の提出など、KYC手続きを行います。
                </div>
                <br />
                <div>ステップ2</div>
                <div>
                  トークン注文ページで、トークン注文専用のアカウントを登録し、トークン注文フォームを提出します。
                </div>
                <br />
                <div>ステップ3</div>
                <div>
                  トークン注文ページに掲載されている、Bloodlink
                  BTCウォレットアドレスまで、BTCを送ります。
                </div>
              </div>
            </Col>
            <Col xs={10} sm={4} md={4} lg={4}>
              {message && <Alert color={status}>{message}</Alert>}
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <h2>{t("login")}</h2>
                  </div>
                  <br />
                  <Form role="form">
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: this.state.focusedEmail
                      })}
                    >
                      <label>Email</label>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          invalid={errors.email ? true : false}
                          disabled={isSubmitting}
                          type="email"
                          name={"email"}
                          value={values["email"]}
                          onChange={e => {
                            setFieldValue("email", e.target.value);
                          }}
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
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
                          type="password"
                          name={"password"}
                          invalid={errors.password ? true : false}
                          disabled={isSubmitting}
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
                          onKeyDown={this.onKeyDown}
                        />
                        {errors.password && (
                          <FormFeedback>{errors.password}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <Row>
                      <Col>
                        <Button
                          block
                          color="info"
                          type="button"
                          onClick={submitForm}
                          disabled={isSubmitting}
                        >
                          {t("sign-in")}
                        </Button>
                      </Col>

                      <Col>
                        <Button color="link" onClick={onClickCreateNewAccount}>
                          <u>{t("create-new-account")}</u>
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

export default LoginPage;
