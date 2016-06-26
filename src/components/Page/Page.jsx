import React from 'react';

import InlineCss from 'react-inline-css';
import styles from './styles';

import Header from '../Header';
import Body from '../Body';
import Footer from '../Footer';

const Page = React.createClass({

  isPreferencesOpen() {
    return this.props.location.pathname == '/preferences/';
  },

  render() {
    return (
      <InlineCss stylesheet={styles} componentName="component">
        <Header preferencesOpen={this.isPreferencesOpen()}/>
        <Body>
          {this.props.children}
        </Body>
        <Footer />
      </InlineCss>
    );
  }
});

export default Page;