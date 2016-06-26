import React from 'react';
import InlineCss from "react-inline-css";

import LoginForm from '../LoginForm';
import FirebaseStatus from '../FirebaseStatus';

import styles from './styles';

const Preferences = React.createClass({

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <LoginForm />
        <FirebaseStatus />
      </InlineCss>
    );
  }
});

export default Preferences;