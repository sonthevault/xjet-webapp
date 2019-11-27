import React, { Component } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Modal,
  Form,
  FormGroup,
  FormFeedback,
  InputGroupAddon,
  CardBody,
  Input,
  Alert
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.jsx";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { path, pathOr } from "ramda";
import { format } from "date-fns"

import API from "../../network/API";
import { LoadingIndication } from "components/Indication/LoadingIndication"
import { NoDataIndication } from "components/Indication/NoDataIndication"

const ReferralTable = ({
  columns,
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  loading = false
}) => (
  <div style={{ maxWidth: "100%", overflow: "scroll" }}>
    <BootstrapTable
      remote
      keyField="id"
      data={data}
      columns={columns}
      pagination={paginationFactory({
        page,
        sizePerPage,
        totalSize,
        alwaysShowAllBtns: true,
        showTotal: true,
        withFirstAndLast: false,
        sizePerPageRenderer: ({
          options,
          currSizePerPage,
          onSizePerPageChange
        }) => (
          <div className="dataTables_length" id="datatable-basic_length">
            <label>
              Show{" "}
              {
                <select
                  name="datatable-basic_length"
                  aria-controls="datatable-basic"
                  className="form-control form-control-sm"
                  onChange={e => onSizePerPageChange(e.target.value)}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              }{" "}
              entries.
            </label>
          </div>
        )
      })}
      onTableChange={onTableChange}
      noDataIndication={() => !loading ? <NoDataIndication /> : <LoadingIndication />}
    />
  </div>
);

class Referral extends Component {
  state = {
    referrals: [],
    page: 1,
    perPage: 10,
    loading: false
  };

  componentDidMount() {
    const { page, sizePerPage } = this.state;
    this.loadReferral(page, sizePerPage);
  }

  handleTableChange = (type, { page, sizePerPage }) => {
    this.loadReferral(page, sizePerPage);
  };

  loadReferral = (page = 1, sizePerPage = 10) => {
    const query = {
      page: page,
      perPage: sizePerPage,
    };

    const { user } = this.props;
    const userId = path(["id"], user);

    if (userId) {
      this.setState({ referrals: [], loading: true });
      API.getReferrals(query).then(response => {
        this.setState({loading: false})
        if (response.status === 200) {
          const referrals = pathOr([], ["data", "data"], response);
          const count = pathOr([], ["data", "totalPages"], response);

          this.setState({ referrals, count, page });
        }
      }).catch(e => {
        console.log(e)
        this.setState({loading: false})
      });
    }
  };

  referralDateFormatter = (cell, row) => {
    return (
      <>
        {format(new Date(cell), 'DD-MM-YYYY hh:mm')}
      </>
    );
  };

  render() {
    const { referrals = [], message, status, count, sizePerPage, page, loading } = this.state;
    return (
      <>
        <SimpleHeader name="Referrals" parentName="" />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Card>
                <CardHeader className="border-0">
                  <Row>
                    <Col xs="6">
                      <h3 className="mb-0">List Of Referrals</h3>
                    </Col>
                  </Row>
                </CardHeader>

                {message && <Alert color={status}>{message}</Alert>}

                <ReferralTable
                  keyField="createdAt"
                  bootstrap4={true}
                  bordered={false}
                  data={referrals}
                  columns={[
                    {
                      dataField: "createdAt",
                      text: "Referral Date",
                      formatter: this.referralDateFormatter
                    },
                    {
                      dataField: "email",
                      text: "Email"
                    },
                    {
                      dataField: "status",
                      text: "Status"
                    },
                  ]}
                  page={page}
                  sizePerPage={sizePerPage}
                  totalSize={count}
                  onTableChange={this.handleTableChange}
                  loading={loading}
                />
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Referral;
