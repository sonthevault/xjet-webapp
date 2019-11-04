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
    this.props.history.push("/signup")
  }

  render() {
    return (
      <div className={styles.container}>
        <Container>
          <br />
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

          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <h1 className={styles.text}>
                The Future of Digital Banking is Taking Off
              </h1>
            </Col>
          </Row>

          <br />

          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <p className={styles.text}>
                Much more than just an exchange, Xjet will be the world’s first
                digital service to offer international trading, wallet, debit
                card and payment services with millions of traders worldwide
                supporting both fiat and crypto payments in the currency and
                coin of your choice.
              </p>
            </Col>
          </Row>

          <br />
          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <h3 className={styles.text}>100% Transactions Guaranteed!</h3>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <ul>
                <li>
                  <p className={styles.text}>
                    The highest level of security with the fastest transaction
                    processing times.
                  </p>
                </li>
                <li>
                  <p className={styles.text}>
                    Bonus incentives on trades and payments or use of debit
                    card.
                  </p>
                </li>
                <li>
                  <p className={styles.text}>
                    Advanced fraud detection using AI and machine learning
                  </p>
                </li>
                <li>
                  <p className={styles.text}>
                    External auditing and PCI DSS Compliance
                  </p>
                </li>
              </ul>
            </Col>
          </Row>

          <br />
          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <h3 className={styles.text}>XJET Sign Up Bonuses</h3>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <ul>
                <li>
                  <p className={styles.text}>
                    Be among the first to join and get bonus XJET pre-sale
                    tokens.
                  </p>
                </li>
                <li>
                  <p className={styles.text}>
                    The 1st 1,000 registration only. See KYC registration
                    process below.
                  </p>
                </li>
              </ul>
            </Col>
          </Row>

          <Row>
            <Col sm="12" md={{ size: 6, offset: 6 }}>
              <Button className="applyButton" onClick={this.onApplyButtonClick}>Apply Here</Button>
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
