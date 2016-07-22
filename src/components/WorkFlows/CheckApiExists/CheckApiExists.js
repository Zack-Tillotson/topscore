import React from 'react';
import InlineStyles from 'react-inline-css';
import api from '../../../api';

import styles from './styles';

const CheckApiExists = React.createClass({

  getInitialState() {
    return {
      topScoreUrl: TOPSCORE_API_URL,
      apiExists: false,
    }
  },

  handleGivenChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  },

  handleGoClick() {
    api.checkApiExists({
      url: this.state.topScoreUrl,
    })
    .then(results => {
      this.setState({
        apiExists: results,
      });
    });
  },

  render() {
    return (
      <InlineStyles stylesheet={styles} componentName="component" className="query-event">

        <section>
          <h1>Check API Exists</h1>
          <p>Query a possible TopScore API URL, returns true if the API looks correct and false otherwise.</p>
        </section>

        <section>
          <h3>Givens</h3>
          <label htmlFor="topScoreUrl">
            Top Score URL:
            <input type="text" id="topScoreUrl" name="topScoreUrl" onChange={this.handleGivenChange.bind(this, 'topScoreUrl')} defaultValue={this.state.topScoreUrl} />
          </label>
        </section>

        <section>
          <h3>Controls</h3>
          <button onClick={this.handleGoClick}>GO!</button>
        </section>

        <section>
          The API Exists: {this.state.apiExists ? 'true' : 'false'}
        </section>

      </InlineStyles>
    );
  }
});

export default CheckApiExists;