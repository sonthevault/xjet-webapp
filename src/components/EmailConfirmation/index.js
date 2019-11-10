import React, { Component } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Form,
  Container,
  Row,
  Col,
  Alert,
  Spinner
} from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader.jsx";

class EmailConfirmation extends Component {
  state = {};

  onKeyDown = e => {
    const { submitForm } = this.props.formik;
    if (e.key === "Enter") {
      submitForm();
    }
  };

  render() {
    const { isLoading, t, onClickSignIn, status, message } = this.props;
    return (
      <>
        <AuthHeader title="XJET.IO" lead="Admin dashboard" />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              {message && <Alert color={status}>{message}</Alert>}
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  {isLoading && (
                    <div className="text-center text-muted mb-4">
                      <Spinner style={{ width: "3rem", height: "3rem" }} />{" "}
                    </div>
                  )}
                  <Form role="form">
                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="info"
                        type="button"
                        onClick={onClickSignIn}
                      >
                        Click here to Sign In
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

export default EmailConfirmation;
