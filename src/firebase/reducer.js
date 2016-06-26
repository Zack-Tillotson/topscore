import actions from '../actions';

function getInitialState() {
  return {
    isLoggedIn: false,
    data: '',
    connected: false,
    serverTimeOffset: 0
  }
}

export default (state = getInitialState(), action) => {
  switch(action.type) {
    case actions.firebase:
      if(action.path == '.info/auth') {
        return {...state, isLoggedIn: !!action.data, authInfo: action.data};
      } else if(action.path == '.info/connected') {
        return {...state, connected: action.data};
      } else if(action.path == '.info/serverTimeOffset') {
        return {...state, serverTimeOffset: action.data};
      } else {
        return {...state, data: action.data};
      }
      break;
  }
  return state;
}