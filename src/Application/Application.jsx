import React from 'react';
import {connect} from 'react-redux';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Page from '../components/Page';
import Homepage from '../components/Homepage';
import Preferences from '../components/Preferences';

import QueryEvent from '../components/WorkFlows/QueryEvent'
import QueryEvents from '../components/WorkFlows/QueryEvents'
import CheckApiExists from '../components/WorkFlows/CheckApiExists'
import GetPage from '../components/WorkFlows/GetPage'
import AddPlayerToTeam from '../components/WorkFlows/AddPlayerToTeam'

import firebase from '../firebase';
import actions from '../firebase/actions';

const selector = (state) => {
  return {};
}

const Application = React.createClass({

  componentDidMount() {
    this.props.firebase.monitorConnection();
    this.props.firebase.syncData('/');
  },

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Page}>
          <IndexRoute component={Homepage} />
          <Route path="preferences">
            <IndexRoute component={Preferences} />
          </Route>
          <Route path="WorkFlows">
            <Route path="QueryEvent">
              <IndexRoute component={QueryEvent} />
            </Route>
            <Route path="QueryEvents">
              <IndexRoute component={QueryEvents} />
            </Route>
            <Route path="CheckApiExists">
              <IndexRoute component={CheckApiExists} />
            </Route>
            <Route path="GetPage">
              <IndexRoute component={GetPage} />
            </Route>
            <Route path="AddPlayerToTeam">
              <IndexRoute component={AddPlayerToTeam} />
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
});

export default connect(selector, actions)(Application);