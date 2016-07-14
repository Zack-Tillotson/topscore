import React from 'react';
import InlineStyles from 'react-inline-css';
import api from '../../../api';

import styles from './styles';

const QueryEvent = React.createClass({

  getInitialState() {
    return {
      topScoreUrl: TOPSCORE_API_URL,
      name: TOPSCORE_EVENT_NAME,
      authToken: TOPSCORE_AUTH_TOKEN,
      event: {},
      teams: [],
      registrations: [],
    }
  },

  handleGivenChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  },

  handleGoClick() {
    api.queryEvent({
      url: this.state.topScoreUrl,
      name: this.state.name,
      queryParams: {
        auth_token: this.state.authToken,
        per_page: 100,
      },
    })
    .then(results => {
      this.setState({
        event: results.event,
        teams: results.teams || [],
        registrations: results.registrations || [],
      });
    });
  },

  render() {
    return (
      <InlineStyles stylesheet={styles} componentName="component" className="query-event">

        <section>
          <h1>Query Event</h1>
          <p>Query an event and associated information, including teams and registrants.</p>
        </section>

        <section>
          <h3>Givens</h3>
          <label htmlFor="topScoreUrl">
            Top Score URL:
            <input type="text" id="topScoreUrl" name="topScoreUrl" onChange={this.handleGivenChange.bind(this, 'topScoreUrl')} defaultValue={this.state.topScoreUrl} />
          </label>
          <label htmlFor="name">
            Event Name:
            <input type="text" id="name" name="name" onChange={this.handleGivenChange.bind(this, 'name')} defaultValue={this.state.name} />
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
          <h4>Event</h4>
          <code>
            {JSON.stringify(this.state.event, null, '  ')}
          </code>
          <h4>{this.state.teams.length} Teams</h4>
          <code>
            {JSON.stringify(this.state.teams, null, '  ')}
          </code>
          <h4>{this.state.registrations.length} Players</h4>
          <code>
            {JSON.stringify(this.state.registrations, null, '  ')}
          </code>
        </section>

      </InlineStyles>
    );
  }
});

export default QueryEvent;