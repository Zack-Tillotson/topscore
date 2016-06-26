import React from 'react';
import InlineCss from "react-inline-css";

import {Link} from 'react-router';
import Preferences from '../Preferences';

import styles from './styles';

const Homepage = React.createClass({

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h1>Web Jumpstart</h1>
        <Link to="/preferences/">Preferences</Link>
        {this.props.children}
      </InlineCss>
    );
  }
});

export default Homepage;