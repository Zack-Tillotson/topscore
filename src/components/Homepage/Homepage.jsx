import React from 'react';
import InlineCss from "react-inline-css";

import {Link} from 'react-router';
import Preferences from '../Preferences';

import styles from './styles';

const Homepage = React.createClass({

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="container">
        <h1>TopScore API</h1>
        <Link to="/WorkFlows/CheckApiExists/">Check Api Exists</Link>
        <Link to="/WorkFlows/GetPage/">Get Page</Link>
        <Link to="/WorkFlows/QueryEvent/">Query Event</Link>
        <Link to="/WorkFlows/QueryEvents/">Query Events</Link>
        <Link to="/WorkFlows/AddPlayerToTeam/">Add Player To Team</Link>
      </InlineCss>
    );
  }
});

export default Homepage;