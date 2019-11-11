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
              <p>
                <strong>Bloodlink Blockchain Project token sale introduction</strong>
              </p>
              <p>
                <strong>
                  Blockchain: Secure, Private and predictive data It's your
                  health protect it with bloodlink
                </strong>
              </p>
              <p>
                <strong>
                  Everyday MEDB value will be change, Pls grab your opportunity
                  today!!!
                </strong>
              </p>

              <br />
              <Table responsive>
                <tbody>
                  <tr>
                    <th scope="row">Project Name</th>
                    <td>Bloodlink</td>
                  </tr>
                  <tr>
                    <th scope="row">Token Name</th>
                    <td>Medical platform for Blood data (Symbol: MEDB)</td>
                  </tr>
                  <tr>
                    <th scope="row">Token Type</th>
                    <td>
                      Utility token in fluctuation value (Not Security, not
                      stable token), ERC20 base
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Total amount issue</th>
                    <td>4 billion tokens</td>
                  </tr>
                  <tr>
                    <th scope="row">Private sales tokens</th>
                    <td>200 million tokens</td>
                  </tr>
                  <tr>
                    <th scope="row">Public sales tokens</th>
                    <td>400 million tokens start on 11.November.2019</td>
                  </tr>
                  <tr>
                    <th scope="row">Token distribution date</th>
                    <td>3 days before listing on exchange</td>
                  </tr>
                  <tr>
                    <th scope="row">Website</th>
                    <td>https://www.bloodlink.io</td>
                  </tr>
                  <tr>
                    <th scope="row">Whitepaper</th>
                    <td>
                      https://www.bloodlink.io/wp-content/uploads/2019/11/Bloodlink-v8.pdf
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Brief of Project</th>
                    <td>
                      Bloodlink is dedicated to providing a comprehensive range
                      of cost effective blood testing solutions for the
                      well-being of humanity. And importantly, at the centre of
                      our belief is the premise, that prevention is better than
                      dealing with the pain and suffering, and high costs
                      associated with the treatment of chronic disease.
                      Bloodlink believe that by marrying its patented medical
                      diagnostic solution, together with a blockchain database
                      and healthcare-focused ecosystem, we can save lives,
                      improve healthcare processes and reduce unnecessary wasted
                      cost and resources where everyone in the healthcare
                      industry can benefit.
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default Introduction;
