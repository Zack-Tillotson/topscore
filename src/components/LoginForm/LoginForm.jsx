import React from 'react';
import InlineCss from "react-inline-css";

import {connect} from 'react-redux';

import styles from './styles';
import selector from './selector';
import firebaseActions from '../../firebase/actions';

const LoginForm = React.createClass({

  render() {
    const services = ['google', 'facebook', 'twitter', 'anonymous'];
    return (
      <InlineCss stylesheet={styles} componentName="container">

        <div className="loginSection">
          {services.map(service => {
            const activeClass = this.props.authProvider == service ? 'active' : '';
            return (
              <div 
                key={service}
                className={["loginOption", service, activeClass].join(' ')}
                onClick={this.props.firebase.requestLogin.bind(this, service)}>
                {service}
              </div>
            );
          })}
        </div>

        {this.props.isLoggedIn && (
          <div className="logoutSection" onClick={this.props.firebase.requestLogout}>
            Logout
          </div>
        )}

      </InlineCss>
    );
  }
});

export default connect(selector, firebaseActions)(LoginForm);