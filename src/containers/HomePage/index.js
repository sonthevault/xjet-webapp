import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import i18n from "i18next";
import { path } from "ramda";
import styles from "./index.module.css";
import { Container, Row, Col, Button } from "reactstrap";
class HomePage extends Component {
  componentDidMount() {}

  onApplyButtonClick = () => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <br />
          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <img
                src={require("../../assets/img/icon.png")}
                className={styles.icon}
                alt=""
              />
            </Col>
          </Row>

          <br />

          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <h1 className={styles.title}>
                The Future of Digital Banking is Taking Off
              </h1>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <p className={styles.secondText}>
                Much more than just an exchange, Xjet will be the world’s first
                digital service to offer international trading, wallet, debit
                card and payment services with millions of traders worldwide
                supporting both fiat and crypto payments in the currency and
                coin of your choice.
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <h2 className={styles.textHeadline}>Transactions Guaranteed!</h2>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <ul>
                <li>
                  The highest level of security with the fastest transaction
                  processing times.
                </li>
                <li>
                  Bonus incentives on trades and payments or use of debit card.
                </li>
                <li>Advanced fraud detection using AI and machine learning</li>
                <li>External auditing and PCI DSS Compliance</li>
              </ul>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <h2 className={styles.textHeadline}>XJET Sign Up Bonuses</h2>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <ul>
                <li>
                  Be among the first to join and get bonus XJET pre-sale tokens.
                </li>
                <li>
                  The 1st 1,000 registration only. See KYC registration process
                  below.
                </li>
              </ul>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <div className={styles.applyButton} onClick={this.onApplyButtonClick}>
                <div className={styles.applyButtonText}>Register Here</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: path(["auth", "data", "access_token"], state)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(HomePage)
);
