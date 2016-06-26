import utils from './utils';

export default {

  requestAuth(service, onError) {
    const ref = utils.connect();
    if(['google', 'twitter', 'facebook'].indexOf(service) >= 0) {
      ref.authWithOAuthRedirect(service, onError);
    } else if(service == 'anonymous') {
      ref.authAnonymously(onError);
    }
  },

  requestUnauth(service, onError) {
    const ref = utils.connect();
    ref.unauth();
  },

  syncConnection(onData) {
    let ref = utils.connect('.info/connected');
    ref.onAuth((auth) => {
      onData({path: '.info/auth', error: false, data: auth});
    });
    ref.on(
      'value', 
      snapshot => {
        if(snapshot.exists()) {
          onData({path: '.info/connected', error: false, data: snapshot.val()});
        } else {
          onData({path: '.info/connected', error: false, data: false});
        }
      }
    );
    ref = utils.connect('.info/serverTimeOffset');
    ref.on(
      'value', 
      snapshot => {
        if(snapshot.exists()) {
          onData({path: '.info/serverTimeOffset', error: false, data: snapshot.val()});
        }
      }
    );
  },

  syncData(onData, path = '/') {
    const ref = utils.connect(path);
    ref.on(
      'value', 
      snapshot => {
        if(snapshot.exists()) {
          onData({path, error: false, data: snapshot.val()});
        } else {
          onData({path, error: true, data: {}});
        }
      }, 
      error => {
        console.log("Firebase error", error);
        onData({path, error: true, data: null, errorData: error});
      }
    );

    return ref;
  }
}