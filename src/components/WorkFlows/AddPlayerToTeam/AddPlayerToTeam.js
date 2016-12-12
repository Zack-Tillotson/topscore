import React from 'react';
import InlineStyles from 'react-inline-css';
import api from '../../../api';

import styles from './styles';

const AddPlayersToTeams = React.createClass({

  getInitialState() {
    return {
      topScoreUrl: TOPSCORE_API_URL,
      authToken: TOPSCORE_AUTH_TOKEN,
      authSecret: TOPSCORE_AUTH_SECRET,
      registrationId: '1632080',
      teamId: '189509',
      roles: 'player',
      resultReg: {},
    }
  },

  handleGivenChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  },

  handleGoClick() {
    api.updatePlayerTeam({
      url: this.state.topScoreUrl,
      name: this.state.name,
      registrationId: this.state.registrationId,
      teamId: this.state.teamId,
      roles: this.state.roles,
      queryParams: {
        auth_token: this.state.authToken,
        secret: this.state.authSecret,
      },
    })
    .then(results => {
      this.setState({
        resultReg: results || {},
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
          <h1>Query Event</h1>
          <p>Query an event and associated information, including teams and registrants.</p>
        </section>

        <section>
          <h3>Givens</h3>
          <label htmlFor="topScoreUrl">
            Top Score URL:
            <input type="text" id="topScoreUrl" name="topScoreUrl" onChange={this.handleGivenChange.bind(this, 'topScoreUrl')} defaultValue={this.state.topScoreUrl} />
          </label>
          <label htmlFor="regId">
            Registration ID:
            <input type="text" id="registrationId" name="registrationId" onChange={this.handleGivenChange.bind(this, 'registrationId')} defaultValue={this.state.registrationId} />
          </label>
          <label htmlFor="teamId">
            Team ID:
            <input type="text" id="teamID" name="teamId" onChange={this.handleGivenChange.bind(this, 'teamId')} defaultValue={this.state.teamId} />
          </label>
          <label htmlFor="authToken">
            AuthToken:
            <input type="text" id="authToken" name="authToken" onChange={this.handleGivenChange.bind(this, 'authToken')} defaultValue={this.state.authToken} />
          </label>
          <label htmlFor="authToken">
            AuthSecret:
            <input type="text" id="authSecret" name="authSecret" onChange={this.handleGivenChange.bind(this, 'authSecret')} defaultValue={this.state.authSecret} />
          </label>
        </section>

        <section>
          <h3>Controls</h3>
          <button onClick={this.handleGoClick}>GO!</button>
        </section>

        <section>
          <h3>Registration Information</h3>
          <table>
            <tbody>
              {this.convertObjectToRows(this.state.resultReg)}
            </tbody>
          </table>
        </section>

      </InlineStyles>
    );
  }
});

export default AddPlayersToTeams;