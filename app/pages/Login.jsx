import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import LoginContainer from 'containers/Login';

class Login extends Component {
  render() {
    return (
      <Page {...this.getMetaData()}>
        <LoginContainer {...this.props} />
      </Page>
    );
  }

  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Авторизация | Questions';
  }

  pageMeta() {
    return [
      { name: "description", content: "A reactGo example of a login or register page" }
    ];
  }

  pageLink() {
    return [];
  }
}

export default Login;
