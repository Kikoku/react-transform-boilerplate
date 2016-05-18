import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountKitLoginActions from './actions/accountKitLoginActions';

AccountKit.init({
  appId:"504537916405124",
  state: 'asdf', //crsf token
  version:"v1.0"
})

class AccountKitLogin extends Component {

  constructor(props) {
    super(props);
    this.loginCallback = this.loginCallback.bind(this);
    this.phoneLogin = this.phoneLogin.bind(this);
    this.emailLogin = this.emailLogin.bind(this);
  }

  componentDidMount() {

  }

  loginCallback(response) {
    console.log(response)
    switch(response.status) {
      case 'PARTIALLY_AUTHENTICATED':
        this.props.actions.authWithAccountKit(response.code);
        break;
      case 'NOT_AUTHENTICATED':
        return '';
      case 'BAD_PARAMS':
        return '';
      default:
        return '';
    }
  }

  phoneLogin() {
    const country_code = '+1';
    const ph_num = '8023499531';
    AccountKit.login(
      'PHONE',
      {countryCode: country_code,phoneNumber: ph_num}, // Will use default values if this arg is not specified
      this.loginCallback
    )
  }

  emailLogin() {
    const email_address = 'candrew022@gmail.com';
    AccountKit.login(
      'EMAIL',
      {emailAddress: email_address}, // Will use default values if this arg is not specified
      this.loginCallback
    )
  }

  render() {
    return (
      <div>
        <h1>Account Kit</h1>
        <button onClick={() => this.phoneLogin()}>Phone</button>
        <button onClick={() => this.emailLogin()}>Email</button>
      </div>
    )
  }
}

export default connect(state => ({
  state: state.accountKitLogin
}),
(dispatch) => ({
  actions: bindActionCreators(accountKitLoginActions, dispatch)
}))(AccountKitLogin);
