import actions from '../actions';
import firebase from './index';

// Don't use these methods directly, rather rhis dispatcher should be attached to a 'connected' component, ie:
//
// import actions from '../firebase/actions';
// import actions from '../firebase/selector';
// ...
// export default connect(selector, actions)(Page);

const dispatcher = (dispatch) => {

  function dispatchData(data) {
    dispatch({type: actions.firebase, ...data});
  }

  return {

    firebase: {

      monitorConnection() {
        return firebase.syncConnection(dispatchData);
      },

      syncData(path) {
        return firebase.syncData(dispatchData, path);
      },

      requestLogin(service) {
        dispatch(() => {
          firebase.requestAuth(service, (error) => {console.log("Firebase auth error!", error)});
        });
      },

      requestLogout() {
        dispatch(() => {
          firebase.requestUnauth();
        });
      }
    }
  }
}

export default dispatcher;