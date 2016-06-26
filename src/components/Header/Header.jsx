import React from 'react';
import InlineCss from "react-inline-css";
import styles from './styles.raw.less';

import {Link} from 'react-router';

export default React.createClass({

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <header>
          <Link to="/">
            <h1>
              <div className="imageContainer">
                <img src="/assets/logo.png" alt="Jumpstart" />
              </div>
            </h1>
          </Link>
          {this.props.preferencesOpen && (
            <Link to="/">
              <div className="prefLink">
                ⓧ
              </div>
            </Link>
          )}
          {!this.props.preferencesOpen && (
            <Link to="/preferences/">
              <div className="prefLink">
                ☰
              </div>
            </Link>
          )}
        </header>
      </InlineCss>
    );
  }
});