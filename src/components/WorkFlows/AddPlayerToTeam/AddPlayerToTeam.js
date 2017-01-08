import React from 'react';
import InlineStyles from 'react-inline-css';
import api from '../../../api';

import styles from './styles';

const AddPlayersToTeams = React.createClass({

  getInitialState() {
    return {
      topScoreUrl: TOPSCORE_API_URL,
      authToken: TOPSCORE_AUTH_TOKEN,
      csrf: '',
      registrationId: '',
      teamId: '',
      resultReg: {},
    }
  },

  handleGivenChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  },

  handleGoClick() {

    let registrationId = this.state.registrationId;
    if(registrationId.indexOf(',') >= 0) {
      registrationId = registrationId.split(',');
    }

    api.updatePlayerTeam({
      url: this.state.topScoreUrl,
      name: this.state.name,
      registrationId,
      teamId: this.state.teamId,
      queryParams: {
        auth_token: this.state.authToken,
        api_csrf: this.state.csrf,
      },
    })
    .then(results => {
      this.setState({
        resultReg: results || {},
      });
    });
  },

  handleBatchGoClick() {

    const registrationIds = this.state.registrationId.split(',');


    api.batchUpdatePlayerTeam({
      url: this.state.topScoreUrl,
      name: this.state.name,
      registrationIds,
      teamId: this.state.teamId,
      queryParams: {
        auth_token: this.state.authToken,
        api_csrf: this.state.csrf,
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
            <input type="text" id="csrf" name="csrf" onChange={this.handleGivenChange.bind(this, 'csrf')} defaultValue={this.state.csrf} />
          </label>
        </section>

        <section>
          <h3>Controls</h3>
          <button onClick={this.handleGoClick}>GO!</button>
          <button onClick={this.handleBatchGoClick}>Batch GO!</button>
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