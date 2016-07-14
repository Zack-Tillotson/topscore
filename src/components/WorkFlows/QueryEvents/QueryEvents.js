import React from 'react';
import InlineStyles from 'react-inline-css';
import api from '../../../api';

import styles from './styles';

const QueryEvents = React.createClass({

  getInitialState() {
    return {
      topScoreUrl: TOPSCORE_API_URL,
      name: TOPSCORE_EVENT_NAME,
      authToken: TOPSCORE_AUTH_TOKEN,
      through: '2016-01-01',
      events: [],
    }
  },

  handleGivenChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  },

  handleGoClick() {
    api.queryEvents({
      url: this.state.topScoreUrl,
      queryParams: {
        auth_token: this.state.authToken,
        per_page: 100,
        through: this.state.through,
      },
    })
    .then(results => {
      this.setState({
        events: results.events,
      });
    });
  },

  convertObjectToRows(obj) {
    return Object.keys(obj).map(key => (
      <tr key={key}>
        <td>{key}</td>
        <td>{JSON.stringify(obj[key], null, '&nbsp;')}</td>
      </tr>
    ));
  },

  render() {
    return (
      <InlineStyles stylesheet={styles} componentName="component" className="query-event">

        <section>
          <h1>Query Events</h1>
          <p>Query for events which start past a given date, does not include associated information like teams and registrants.</p>
        </section>

        <section>
          <h3>Givens</h3>
          <label htmlFor="topScoreUrl">
            Top Score URL:
            <input type="text" id="topScoreUrl" name="topScoreUrl" onChange={this.handleGivenChange.bind(this, 'topScoreUrl')} defaultValue={this.state.topScoreUrl} />
          </label>
          <label htmlFor="through">
            Start Date:
            <input type="text" id="through" name="through" onChange={this.handleGivenChange.bind(this, 'through')} defaultValue={this.state.through} />
          </label>
          <label htmlFor="authToken">
            AuthToken:
            <input type="text" id="authToken" name="authToken" onChange={this.handleGivenChange.bind(this, 'authToken')} defaultValue={this.state.authToken} />
          </label>
        </section>

        <section>
          <h3>Controls</h3>
          <button onClick={this.handleGoClick}>GO!</button>
        </section>

        <section>
          <h3>Event Information</h3>
          <h4>{this.state.events.length} Events</h4>
          {this.state.events.map((team, index) => (
            <div key={index}>
              <table>
                <tbody>
                  {this.convertObjectToRows(team)}
                </tbody>
              </table>
            </div>
          ))}
        </section>

      </InlineStyles>
    );
  }
});

export default QueryEvents;