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
  Alert,
  Media,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";
import DatePicker from "react-datetime";

import AuthHeader from "components/Headers/AuthHeader.jsx";
import LoadingButton from "components/LoadingButton";
import API from "../../network/API";
import { path } from "ramda";

import "./index.css";

class RegisterPage extends Component {
  state = {
    identityCardFile: null,
    holdingIdentityCardFile: null,
    proofOfAddressFile: null,
    currentBirthday: new Date(),
    successRegisterModal: false,
    isUploadingIdentityCardFile: false,
    isUploadingProofOfAddressFile: false
  };

  componentDidMount = () => {
    const { formik, t, status, message } = this.props;
  };

  onKeyDown = e => {
    const { submitForm } = this.props.formik;
    if (e.key === "Enter") {
      submitForm();
    }
  };

  onIdentityCardFileChangeHandler = event => {
    const { setFieldValue } = this.props.formik;

    if (event.target.files[0]) {
      const file = event.target.files[0];
      const fileSizeInMB = Math.floor(Number(file.size) / 1024 / 1024);
      this.props.formik.setFieldError("identityCardPicture", null);
      if (fileSizeInMB > 10) {
        this.props.formik.setFieldError("identityCardPicture", "Maximum upload file size is 10MB")
        return;
      }
      
      const data = new FormData();
      data.append("file", file);
      data.append("name", file.name);
      data.append("type", "image");

      this.setState({ isUploadingIdentityCardFile: true });

      API.upload(data)
        .then(response => {
          this.setState({ isUploadingIdentityCardFile: false });
          console.log("response", response);
          if (response.status === 200) {
            const identityCardFile = path(["data", "data", "url"], response);
            if (identityCardFile) {
              this.setState({
                identityCardFile
              });
              setFieldValue("identityCardPicture", identityCardFile);
            }
          }
        })
        .catch(error => {
          this.setState({ isUploadingIdentityCardFile: false });
          console.log("error", error);
        });
    }
  };

  onHoldingIdentityCardFileChangeHandler = event => {
    const { setFieldValue } = this.props.formik;

    if (event.target.files[0]) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("name", file.name);
      data.append("type", "image");

      this.setState({ isUploadingProofOfAddressFile: true });

      API.upload(data)
        .then(response => {
          this.setState({ isUploadingProofOfAddressFile: false });
          console.log("response", response);
          if (response.status === 200) {
            const holdingIdentityCardFile = path(
              ["data", "data", "url"],
              response
            );
            if (holdingIdentityCardFile) {
              this.setState({
                holdingIdentityCardFile
              });
              setFieldValue(
                "holdingIdentityCardPicture",
                holdingIdentityCardFile
              );
            }
          }
        })
        .catch(error => {
          this.setState({ isUploadingProofOfAddressFile: false });
          console.log("error", error);
        });
    }
  };

  onProofOfAddressFileChangeHandler = event => {
    const { setFieldValue } = this.props.formik;

    if (event.target.files[0]) {
      const file = event.target.files[0];
      const fileSizeInMB = Math.floor(Number(file.size) / 1024 / 1024);
      this.props.formik.setFieldError("proofOfAddressPicture", null);
      if (fileSizeInMB > 10) {
        this.props.formik.setFieldError("proofOfAddressPicture", "Maximum upload file size is 10MB")
        return;
      }

      const data = new FormData();
      data.append("file", file);
      data.append("name", file.name);
      data.append("type", "image");

      API.upload(data)
        .then(response => {
          console.log("response", response);
          if (response.status === 200) {
            const proofOfAddressFile = path(["data", "data", "url"], response);
            if (proofOfAddressFile) {
              this.setState({
                proofOfAddressFile
              });
              setFieldValue("proofOfAddressPicture", proofOfAddressFile);
            }
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  };

  onBirthdayChangeHandler = e => {
    const { setFieldValue } = this.props.formik;

    if (e && typeof e.format === "function") {
      const selectedDate = e.format("MM-DD-YYYY");
      console.log("onBirthdayChangeHandler", selectedDate);
      this.setState({
        currentBirthday: selectedDate
      });
      setFieldValue("birthday", selectedDate);
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
                  <h2>Registration Process</h2>
                  <p>
                    Please have the following documents ready before you start
                    the registration process. This process will take
                    approximately 5 minutes or less to complete
                  </p>

                  <br />

                  <Form role="form">
                    <label>Email</label>
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

                    <label>Password</label>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          placeholder={t("password")}
                          type="password"
                          name={"password"}
                          value={values["password"]}
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
                          invalid={errors.password ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.password && (
                          <FormFeedback>{errors.password}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <label>Confirm password</label>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedConfirmationPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          placeholder={t("confirmation-password")}
                          type="password"
                          name={"confirmationPassword"}
                          value={values["confirmationPassword"]}
                          onChange={e => {
                            setFieldValue(
                              "confirmationPassword",
                              e.target.value
                            );
                          }}
                          onFocus={() =>
                            this.setState({ focusedConfirmationPassword: true })
                          }
                          onBlur={() =>
                            this.setState({
                              focusedConfirmationPassword: false
                            })
                          }
                          invalid={errors.confirmationPassword ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.confirmationPassword && (
                          <FormFeedback>
                            {errors.confirmationPassword}
                          </FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>
                    {/* ======================== Start Personal Details PART ==========================*/}
                    <h2>Personal Details</h2>
                    <FormGroup>
                      <label>Nationality</label>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          placeholder={"Nationality"}
                          type="select"
                          name={"nationality"}
                          value={values["nationality"]}
                          onChange={e => {
                            setFieldValue("nationality", e.target.value);
                          }}
                          invalid={errors.nationality ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        >
                          <option value="">
                            Please select your nationality
                          </option>
                          <option value="Afganistan">Afghanistan</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="American Samoa">American Samoa</option>
                          <option value="Andorra">Andorra</option>
                          <option value="Angola">Angola</option>
                          <option value="Anguilla">Anguilla</option>
                          <option value="Antigua & Barbuda">
                            Antigua & Barbuda
                          </option>
                          <option value="Argentina">Argentina</option>
                          <option value="Armenia">Armenia</option>
                          <option value="Aruba">Aruba</option>
                          <option value="Australia">Australia</option>
                          <option value="Austria">Austria</option>
                          <option value="Azerbaijan">Azerbaijan</option>
                          <option value="Bahamas">Bahamas</option>
                          <option value="Bahrain">Bahrain</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Barbados">Barbados</option>
                          <option value="Belarus">Belarus</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Belize">Belize</option>
                          <option value="Benin">Benin</option>
                          <option value="Bermuda">Bermuda</option>
                          <option value="Bhutan">Bhutan</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Bonaire">Bonaire</option>
                          <option value="Bosnia & Herzegovina">
                            Bosnia & Herzegovina
                          </option>
                          <option value="Botswana">Botswana</option>
                          <option value="Brazil">Brazil</option>
                          <option value="British Indian Ocean Ter">
                            British Indian Ocean Ter
                          </option>
                          <option value="Brunei">Brunei</option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="Burundi">Burundi</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Canada">Canada</option>
                          <option value="Canary Islands">Canary Islands</option>
                          <option value="Cape Verde">Cape Verde</option>
                          <option value="Cayman Islands">Cayman Islands</option>
                          <option value="Central African Republic">
                            Central African Republic
                          </option>
                          <option value="Chad">Chad</option>
                          <option value="Channel Islands">
                            Channel Islands
                          </option>
                          <option value="Chile">Chile</option>
                          <option value="China">China</option>
                          <option value="Christmas Island">
                            Christmas Island
                          </option>
                          <option value="Cocos Island">Cocos Island</option>
                          <option value="Colombia">Colombia</option>
                          <option value="Comoros">Comoros</option>
                          <option value="Congo">Congo</option>
                          <option value="Cook Islands">Cook Islands</option>
                          <option value="Costa Rica">Costa Rica</option>
                          <option value="Cote DIvoire">Cote DIvoire</option>
                          <option value="Croatia">Croatia</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Curaco">Curacao</option>
                          <option value="Cyprus">Cyprus</option>
                          <option value="Czech Republic">Czech Republic</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Djibouti">Djibouti</option>
                          <option value="Dominica">Dominica</option>
                          <option value="Dominican Republic">
                            Dominican Republic
                          </option>
                          <option value="East Timor">East Timor</option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Egypt">Egypt</option>
                          <option value="El Salvador">El Salvador</option>
                          <option value="Equatorial Guinea">
                            Equatorial Guinea
                          </option>
                          <option value="Eritrea">Eritrea</option>
                          <option value="Estonia">Estonia</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Falkland Islands">
                            Falkland Islands
                          </option>
                          <option value="Faroe Islands">Faroe Islands</option>
                          <option value="Fiji">Fiji</option>
                          <option value="Finland">Finland</option>
                          <option value="France">France</option>
                          <option value="French Guiana">French Guiana</option>
                          <option value="French Polynesia">
                            French Polynesia
                          </option>
                          <option value="French Southern Ter">
                            French Southern Ter
                          </option>
                          <option value="Gabon">Gabon</option>
                          <option value="Gambia">Gambia</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Germany">Germany</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Gibraltar">Gibraltar</option>
                          <option value="Great Britain">Great Britain</option>
                          <option value="Greece">Greece</option>
                          <option value="Greenland">Greenland</option>
                          <option value="Grenada">Grenada</option>
                          <option value="Guadeloupe">Guadeloupe</option>
                          <option value="Guam">Guam</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Guinea">Guinea</option>
                          <option value="Guyana">Guyana</option>
                          <option value="Haiti">Haiti</option>
                          <option value="Hawaii">Hawaii</option>
                          <option value="Honduras">Honduras</option>
                          <option value="Hong Kong">Hong Kong</option>
                          <option value="Hungary">Hungary</option>
                          <option value="Iceland">Iceland</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="India">India</option>
                          <option value="Iran">Iran</option>
                          <option value="Iraq">Iraq</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Isle of Man">Isle of Man</option>
                          <option value="Israel">Israel</option>
                          <option value="Italy">Italy</option>
                          <option value="Jamaica">Jamaica</option>
                          <option value="Japan">Japan</option>
                          <option value="Jordan">Jordan</option>
                          <option value="Kazakhstan">Kazakhstan</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Kiribati">Kiribati</option>
                          <option value="Korea North">Korea North</option>
                          <option value="Korea Sout">Korea South</option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                          <option value="Laos">Laos</option>
                          <option value="Latvia">Latvia</option>
                          <option value="Lebanon">Lebanon</option>
                          <option value="Lesotho">Lesotho</option>
                          <option value="Liberia">Liberia</option>
                          <option value="Libya">Libya</option>
                          <option value="Liechtenstein">Liechtenstein</option>
                          <option value="Lithuania">Lithuania</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Macau">Macau</option>
                          <option value="Macedonia">Macedonia</option>
                          <option value="Madagascar">Madagascar</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Malawi">Malawi</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Mali">Mali</option>
                          <option value="Malta">Malta</option>
                          <option value="Marshall Islands">
                            Marshall Islands
                          </option>
                          <option value="Martinique">Martinique</option>
                          <option value="Mauritania">Mauritania</option>
                          <option value="Mauritius">Mauritius</option>
                          <option value="Mayotte">Mayotte</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Midway Islands">Midway Islands</option>
                          <option value="Moldova">Moldova</option>
                          <option value="Monaco">Monaco</option>
                          <option value="Mongolia">Mongolia</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Mozambique">Mozambique</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Nambia">Nambia</option>
                          <option value="Nauru">Nauru</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Netherland Antilles">
                            Netherland Antilles
                          </option>
                          <option value="Netherlands">
                            Netherlands (Holland, Europe)
                          </option>
                          <option value="Nevis">Nevis</option>
                          <option value="New Caledonia">New Caledonia</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Nicaragua">Nicaragua</option>
                          <option value="Niger">Niger</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Niue">Niue</option>
                          <option value="Norfolk Island">Norfolk Island</option>
                          <option value="Norway">Norway</option>
                          <option value="Oman">Oman</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Palau Island">Palau Island</option>
                          <option value="Palestine">Palestine</option>
                          <option value="Panama">Panama</option>
                          <option value="Papua New Guinea">
                            Papua New Guinea
                          </option>
                          <option value="Paraguay">Paraguay</option>
                          <option value="Peru">Peru</option>
                          <option value="Phillipines">Philippines</option>
                          <option value="Pitcairn Island">
                            Pitcairn Island
                          </option>
                          <option value="Poland">Poland</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Puerto Rico">Puerto Rico</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Republic of Montenegro">
                            Republic of Montenegro
                          </option>
                          <option value="Republic of Serbia">
                            Republic of Serbia
                          </option>
                          <option value="Reunion">Reunion</option>
                          <option value="Romania">Romania</option>
                          <option value="Russia">Russia</option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="St Barthelemy">St Barthelemy</option>
                          <option value="St Eustatius">St Eustatius</option>
                          <option value="St Helena">St Helena</option>
                          <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                          <option value="St Lucia">St Lucia</option>
                          <option value="St Maarten">St Maarten</option>
                          <option value="St Pierre & Miquelon">
                            St Pierre & Miquelon
                          </option>
                          <option value="St Vincent & Grenadines">
                            St Vincent & Grenadines
                          </option>
                          <option value="Saipan">Saipan</option>
                          <option value="Samoa">Samoa</option>
                          <option value="Samoa American">Samoa American</option>
                          <option value="San Marino">San Marino</option>
                          <option value="Sao Tome & Principe">
                            Sao Tome & Principe
                          </option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Senegal">Senegal</option>
                          <option value="Seychelles">Seychelles</option>
                          <option value="Sierra Leone">Sierra Leone</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Slovakia">Slovakia</option>
                          <option value="Slovenia">Slovenia</option>
                          <option value="Solomon Islands">
                            Solomon Islands
                          </option>
                          <option value="Somalia">Somalia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Spain">Spain</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Sudan">Sudan</option>
                          <option value="Suriname">Suriname</option>
                          <option value="Swaziland">Swaziland</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Syria">Syria</option>
                          <option value="Tahiti">Tahiti</option>
                          <option value="Taiwan">Taiwan</option>
                          <option value="Tajikistan">Tajikistan</option>
                          <option value="Tanzania">Tanzania</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Togo">Togo</option>
                          <option value="Tokelau">Tokelau</option>
                          <option value="Tonga">Tonga</option>
                          <option value="Trinidad & Tobago">
                            Trinidad & Tobago
                          </option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Turkmenistan">Turkmenistan</option>
                          <option value="Turks & Caicos Is">
                            Turks & Caicos Is
                          </option>
                          <option value="Tuvalu">Tuvalu</option>
                          <option value="Uganda">Uganda</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Ukraine">Ukraine</option>
                          <option value="United Arab Erimates">
                            United Arab Emirates
                          </option>
                          <option value="United States of America">
                            United States of America
                          </option>
                          <option value="Uraguay">Uruguay</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Vanuatu">Vanuatu</option>
                          <option value="Vatican City State">
                            Vatican City State
                          </option>
                          <option value="Venezuela">Venezuela</option>
                          <option value="Vietnam">Vietnam</option>
                          <option value="Virgin Islands (Brit)">
                            Virgin Islands (Brit)
                          </option>
                          <option value="Virgin Islands (USA)">
                            Virgin Islands (USA)
                          </option>
                          <option value="Wake Island">Wake Island</option>
                          <option value="Wallis & Futana Is">
                            Wallis & Futana Is
                          </option>
                          <option value="Yemen">Yemen</option>
                          <option value="Zaire">Zaire</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </Input>

                        {errors.nationality && (
                          <FormFeedback>{errors.nationality}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>
                    <Row>
                      <Col>
                        <label>First Name</label>
                        <FormGroup
                          className={classnames({
                            focused: this.state.focusedFirstName
                          })}
                        >
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder={"First name"}
                              type="text"
                              name={"firstName"}
                              value={values["firstName"]}
                              onChange={e => {
                                setFieldValue("firstName", e.target.value);
                              }}
                              onFocus={() =>
                                this.setState({ focusedFirstName: true })
                              }
                              onBlur={() =>
                                this.setState({
                                  focusedFirstName: false
                                })
                              }
                              invalid={errors.firstName ? true : false}
                              disabled={isSubmitting}
                              onKeyDown={this.onKeyDown}
                            />

                            {errors.firstName && (
                              <FormFeedback>{errors.firstName}</FormFeedback>
                            )}
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col>
                        <label>Last Name</label>
                        <FormGroup
                          className={classnames({
                            focused: this.state.focusedLastName
                          })}
                        >
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder={"Last name"}
                              type="text"
                              name={"lastName"}
                              value={values["lastName"]}
                              onChange={e => {
                                setFieldValue("lastName", e.target.value);
                              }}
                              onFocus={() =>
                                this.setState({ focusedLastName: true })
                              }
                              onBlur={() =>
                                this.setState({
                                  focusedLastName: false
                                })
                              }
                              invalid={errors.lastName ? true : false}
                              disabled={isSubmitting}
                              onKeyDown={this.onKeyDown}
                            />

                            {errors.lastName && (
                              <FormFeedback>{errors.lastName}</FormFeedback>
                            )}
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedAddress
                      })}
                    >
                      <label>Birthday</label>
                      <DatePicker
                        value={this.state.currentBirthday}
                        onChange={this.onBirthdayChangeHandler}
                        dateFormat="MM-DD-YYYY"
                        timeFormat={false}
                      />
                    </FormGroup>

                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedAddress
                      })}
                    >
                      <label>Address</label>
                      <InputGroup className="input-group-merge input-group-alternative">
                        <Input
                          placeholder={"Address"}
                          type="text"
                          name={"address"}
                          value={values["address"]}
                          onChange={e => {
                            setFieldValue("address", e.target.value);
                          }}
                          onFocus={() =>
                            this.setState({ focusedAddress: true })
                          }
                          onBlur={() =>
                            this.setState({
                              focusedAddress: false
                            })
                          }
                          invalid={errors.address ? true : false}
                          disabled={isSubmitting}
                          onKeyDown={this.onKeyDown}
                        />

                        {errors.address && (
                          <FormFeedback>{errors.address}</FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>
                    <Row>
                      <Col xs="3">
                        <label>ID Type</label>
                        <Input
                          placeholder={"ID Type"}
                          type="select"
                          name={"identityType"}
                          value={values["identityType"]}
                          onChange={e => {
                            setFieldValue("identityType", e.target.value);
                          }}
                          invalid={errors.identityType ? true : false}
                          disabled={isSubmitting}
                        >
                          <option value="id_card">National ID</option>
                          <option value="driver_license">Driver License</option>
                          <option value="passport">Passport</option>
                        </Input>
                      </Col>

                      <Col xs="9">
                        <label>ID Number</label>
                        <FormGroup
                          className={classnames({
                            focused: this.state.focusedIdentityNumber
                          })}
                        >
                          <InputGroup className="input-group-merge input-group-alternative">
                            <Input
                              placeholder={"ID Number"}
                              type="text"
                              name={"identityNumber"}
                              value={values["identityNumber"]}
                              onChange={e => {
                                setFieldValue("identityNumber", e.target.value);
                              }}
                              onFocus={() =>
                                this.setState({ focusedIdentityNumber: true })
                              }
                              onBlur={() =>
                                this.setState({
                                  focusedIdentityNumber: false
                                })
                              }
                              invalid={errors.identityNumber ? true : false}
                              disabled={isSubmitting}
                              onKeyDown={this.onKeyDown}
                            />

                            {errors.identityNumber && (
                              <FormFeedback>
                                {errors.identityNumber}
                              </FormFeedback>
                            )}
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                    <div class="d-flex align-items-start">
                      <h4>Gender</h4>
                      <Col></Col>
                      <Col>
                        <label>
                          <Input
                            type="radio"
                            name={"gender"}
                            checked={values["gender"] === "male"}
                            value="male"
                            onChange={e => {
                              setFieldValue("gender", "male");
                            }}
                            disabled={isSubmitting}
                          />
                          Male
                        </label>
                      </Col>

                      <Col>
                        <label>
                          <Input
                            type="radio"
                            name={"gender"}
                            checked={values["gender"] === "female"}
                            value="female"
                            onChange={e => {
                              setFieldValue("gender", "female");
                            }}
                            disabled={isSubmitting}
                          />
                          Female
                        </label>
                      </Col>
                    </div>
                    {/* ======================== End Personal Details PART ==========================*/}
                    <br />
                    {/* ======================== Start Document Upload PART ==========================*/}
                    <h2>Identification Documents</h2>
                    <Row>
                      <Col xs="6">
                        <strong>Acceptable documents (Both sides)</strong>
                        <p>Choose from either:</p>
                        <p>1. Passport</p>
                        <p>2. National ID</p>
                        <p>3. Drivers License</p>
                        <br />
                      </Col>
                      <Col xs="6">
                        <strong>
                          Proof of Address (Must be not more than 3 months old)
                        </strong>
                        <p>Choose from either:</p>
                        <p>1. Utility Bill</p>
                        <p>2. Telephone Bill</p>
                        <p>3. Bank Statement</p>
                        <br />
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="6">
                        {this.state.identityCardFile && (
                          <img
                            class="preview-image"
                            src={this.state.identityCardFile}
                            alt="Identity document"
                          />
                        )}

                        <div class="upload-button-container">
                          <LoadingButton
                            color={"#000b33"}
                            loading={this.state.isUploadingIdentityCardFile}
                          >
                            <img
                              src={require("../../assets/img/upload_button.png")}
                              alt=""
                              class="upload-button-icon"
                            ></img>
                            <span class="upload-btn">Upload</span>
                          </LoadingButton>
                          <Input
                            type="file"
                            name="identityCardFile"
                            onChange={this.onIdentityCardFileChangeHandler}
                          ></Input>
                          <Input
                            type="hidden"
                            name={"identityCardPicture"}
                            value={values["identityCardPicture"]}
                          ></Input>
                        </div>
                        {errors.identityCardPicture && (
                          <div class="invalid-feedback">
                            {errors.identityCardPicture}
                          </div>
                        )}
                      </Col>
                      <Col xs="6">
                        {this.state.proofOfAddressFile && (
                          <img
                            class="preview-image"
                            src={this.state.proofOfAddressFile}
                            alt="Address document"
                          />
                        )}
                        <div class="upload-button-container">
                          <LoadingButton
                            color={"#000b33"}
                            loading={this.state.isUploadingProofOfAddressFile}
                          >
                            <img
                              src={require("../../assets/img/upload_button.png")}
                              alt=""
                              class="upload-button-icon"
                            ></img>
                            <span class="upload-btn">Upload</span>
                          </LoadingButton>

                          <Input
                            type="file"
                            name="proofOfAddressFile"
                            onChange={this.onProofOfAddressFileChangeHandler}
                          ></Input>
                          <Input
                            type="hidden"
                            name={"proofOfAddressPicture"}
                            value={values["proofOfAddressPicture"]}
                          ></Input>
                        </div>

                        {errors.proofOfAddressPicture && (
                          <div class="invalid-feedback">
                            {errors.proofOfAddressPicture}
                          </div>
                        )}
                      </Col>
                    </Row>
                    <br />

                    <p>
                      Once submitted, please allow 3~7 working days for
                      processing and verification.
                    </p>
                    <br />
                    <p>Thank you.</p>
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

export default RegisterPage;
