import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DashBoard from "components/DashBoard";
import { path } from "ramda";
import { logout } from "redux/actions";

class DashBoardContainer extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated || !this.props.user) {
      this.props.history.push("/");
    }

    const lastPath = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    if (lastPath === "user") {
      this.props.history.push("/user/introduction");
    }

  }

  openInNewTab  = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  onLogoutClick = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  onSupportClick = () => {
    this.openInNewTab("https://xjet.zendesk.com/hc/en-us/requests/new");
  }

  onUserProfileClick = () => {
    this.props.history.push("/user/profile");
  }

  onTokenClick = () => {
    this.props.history.push("/user/token");
  }

  onSettingItemClick = () => {
    this.props.history.push("/user/profile");
  }

  onProjectIntroductionClick = () => {
    this.props.history.push("/user/introduction");
  }

  render() {
    const { user } = this.props;
    
    if (!user) {
      return null;
    }
    return (
      <DashBoard
        {...this.props}
        onLogoutClick={this.onLogoutClick}
        onSupportClick={this.onSupportClick}
        onTokenClick={this.onTokenClick}
        onUserProfileClick={this.onUserProfileClick}
        onProjectIntroductionClick={this.onProjectIntroductionClick}
        user={user}
        onSettingItemClick={this.onSettingItemClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: path(["auth", "data", "token", "accessToken"], state),
    user: path(["auth", "data", "user",], state)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      logout
    }
  )(DashBoardContainer)
);
