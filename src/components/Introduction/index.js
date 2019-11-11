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
  FormFeedback,
  Table
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import styles from "./index.module.css";

class Introduction extends Component {
  state = {};

  onKeyDown = e => {
    const { submitForm } = this.props.formik;
    if (e.key === "Enter") {
      submitForm();
    }
  };

  render() {
    const { t } = this.props;

    return (
      <>
        <SimpleHeader name={t("title")} />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader>
              <h3 className="mb-0">{t("title")}</h3>
            </CardHeader>
            <CardBody>
              <img
                src={require("../../assets/img/bloodlink.png")}
                alt="Bloodlink icon"
              />
              <br />
              <br />
              <p className={styles.headline}>
                Bloodlink Blockchain Project token sale introduction
              </p>
              <p className={styles.headline}>
                Blockchain: Secure, Private and predictive data It's your health
                protect it with bloodlink
              </p>
              <p className={styles.headline}>
                Everyday MEDB value will be change, Pls grab your opportunity
                today!!!
              </p>

              <br />
              <div class="table-responsive">
                <div>
                  <label className={styles.label}>1. Project Name: &nbsp;</label>
                  <span>Bloodlink</span>
                </div>
                <div>
                  <label className={styles.label}>2. Token Name:  &nbsp;</label>
                  <span>
                    Medical platform for Blood data (Symbol: MEDB)
                  </span>
                </div>
                <div>
                  <label className={styles.label}>3. Token Type:  &nbsp;</label>
                  <span>
                    Utility token in fluctuation value (Not Security, not stable
                    token), ERC20 base
                  </span>
                </div>
                <div>
                  <label className={styles.label}>4. Total amount issue:  &nbsp;</label>
                  <span>4 billion tokens</span>
                </div>
                <div>
                  <label className={styles.label}>5. Private sales tokens:  &nbsp;</label>
                  <span>200 million tokens</span>
                </div>
                <div>
                  <label className={styles.label}>6. Public sales tokens:  &nbsp;</label>
                  <span>400 million tokens start on 11.November.2019</span>
                </div>
                <div>
                  <label className={styles.label}>7. Token distribution date:  &nbsp;</label>
                  <span>3 days before listing on exchange</span>
                </div>
                <div>
                  <label className={styles.label}>8. Website:  &nbsp;</label>
                  <span>https://www.bloodlink.io</span>
                </div>
                <div>
                  <label className={styles.label}>9. Whitepaper:  &nbsp;</label>
                  <span>
                    https://www.bloodlink.io/wp-content/uploads/2019/11/Bloodlink-v8.pdf
                  </span>
                </div>
                <div>
                  <label className={styles.label}>10. Brief of Project:  &nbsp;</label>
                  <span>
                    Bloodlink is dedicated to providing a comprehensive range of
                    cost effective blood testing solutions for the well-being of
                    humanity. And importantly, at the centre of our belief is
                    the premise, that prevention is better than dealing with the
                    pain and suffering, and high costs associated with the
                    treatment of chronic disease. Bloodlink believe that by
                    marrying its patented medical diagnostic solution, together
                    with a blockchain database and healthcare-focused ecosystem,
                    we can save lives, improve healthcare processes and reduce
                    unnecessary wasted cost and resources where everyone in the
                    healthcare industry can benefit.
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default Introduction;
