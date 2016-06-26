export default (state) => {
  let authProvider = state.firebase.authInfo && state.firebase.authInfo.provider || ''
  return {
    ...state.firebase,
    authProvider
  };
}