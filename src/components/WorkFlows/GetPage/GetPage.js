import React from 'react';
import InlineStyles from 'react-inline-css';
import api from '../../../api';

import styles from './styles';

const GetPage = React.createClass({

  getInitialState() {
    return {
      topScoreUrl: TOPSCORE_API_URL,
      name: TOPSCORE_EVENT_NAME,
      authToken: TOPSCORE_AUTH_TOKEN,
      page: api.HELP,
      pageData: {},
    }
  },

  handleGivenChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  },

  handleGoClick() {
    api.getPage(
      this.state.topScoreUrl,
      this.state.page,
      {
        auth_token: this.state.authToken,
        per_page: 100,
      },
    )
    .then(results => {
      this.setState({
        pageData: results.body,
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
          <label htmlFor="name">
            Page:
            <input type="text" id="page" name="page" onChange={this.handleGivenChange.bind(this, 'page')} defaultValue={this.state.page} />
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
          <h3>Page</h3>
          <table>
            <tbody>
              {this.convertObjectToRows(this.state.pageData)}
            </tbody>
          </table>
        </section>

      </InlineStyles>
    );
  }
});

export default GetPage;