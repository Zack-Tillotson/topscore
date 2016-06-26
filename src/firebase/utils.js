import Firebase from 'firebase';

const firebaseUrlBase = 'https://zt-jumpstart.firebaseio.com';

function getFirebaseUrl(path) {
  return [firebaseUrlBase, path]
    .filter(section => !!section)
    .join('/');
}

function connect(path) {
  const firebaseUrl = getFirebaseUrl(path);
  return new Firebase(firebaseUrl);
}

export default {connect};