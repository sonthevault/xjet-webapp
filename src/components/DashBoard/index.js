import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import AdminFooter from "components/Footers/AdminFooter.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import userRoutes from "routes.js";
import adminRoutes from "routes.admin.js";

class DashBoard extends Component {
  state = {
    sidenavOpen: true
  };

  componentDidMount() {
    document.body.classList.add("g-sidenav-pinned");
    document.body.classList.remove("g-sidenav-hidden");
  }

  componentDidUpdate(e) {
    if (e.history.pathname !== e.location.pathname) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainContent.scrollTop = 0;
    }
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  };

  getBrandText = () => {
    return "The Vault";
  };

  // toggles collapse between mini sidenav and normal
  toggleSidenav = e => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    this.setState({
      sidenavOpen: !this.state.sidenavOpen
    });
  };

  render() {
    const { user } = this.props;
    const routes = user.roleType === "Admin" ? adminRoutes : userRoutes

    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          toggleSidenav={this.toggleSidenav}
          sidenavOpen={this.state.sidenavOpen}
        />
        <div
          className="main-content"
          ref="mainContent"
          onClick={this.closeSidenav}
        >
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            user={user}
            onSettingItemClick={this.props.onSettingItemClick}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          <AdminFooter />
        </div>
        <div className="backdrop d-xl-none" onClick={this.toggleSidenav} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default DashBoard;
