import React from 'react';

import { Provider } from 'react-redux';
import store from './state/store';

import Application from './Application';

export default React.createClass({
  render() { 
    return (
      <Provider store={store()}>
        <Application />
      </Provider>
    );
  }
});