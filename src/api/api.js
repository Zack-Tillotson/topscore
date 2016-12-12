import Promise from 'promise';
import request from 'superagent';
import Throttle from './throttle';
import sha256 from 'crypto-js/hmac-sha256';

const throttle = Throttle(1000);

const HELP = '/api/help';
const EVENTS = '/api/events';
const TEAMS = '/api/teams';
const REGISTRATIONS = '/api/registrations';

// Utility functions ////////////////////////////////////

function buildUrl(url, endpoint) {
  return `https://${url}${endpoint}`;
}

function getPage(url, endpoint, queryParams = {}) {
  const {page = 1, ...restParams} = queryParams;
  return throttle.enqueue()
    .then(function() {
      return new Promise(function(resolve, reject) {
        request
          .get(buildUrl(url, endpoint))
          .query({page, ...restParams})
          .end(function(err, response){
            if(err) {
              reject(response);
            } else {
              resolve(response);
            }
          });
      });
  });
}

function getPageRecursive(soFar, url, endpoint, queryParams, page) {
  return getPage(url, endpoint, {...queryParams, page})
    .then(response => {
      const {status, count, result} = response.body;
      if(status != "200") {
        throw('Bad request error', response);
      } else {
        soFar = [...soFar, ...result];
        if(soFar.length < count) {
          return getPageRecursive(soFar, url, endpoint, queryParams, page + 1);
        } else {
          return Promise.resolve(soFar);
        }
      }
    })
    .catch(response => {
      console.log('something failed!', response);
    });
}

function getAllItems(endpoint, options) {
  const {url, queryParams} = options;
  return getPageRecursive([], url, endpoint, queryParams, 1);
}

function findItem(endpoint, query, options) {

  const {url, queryParams} = options;

  return getAllItems(endpoint, options)
    .then(results => {
      const foundItem = results.find(result => {
        let found = true;
        Object.keys(query).forEach(key => {
          if(result[key] !== query[key]) {
            found = false;
          }
        });
        return found;
      });
      const itemType = !foundItem ? 'item' : foundItem.model;
      return Promise.resolve({...options, [itemType]: foundItem});
    });
}

// Given the item endpoint, the item value, and user's auth-key and auth-secret
// will calculate the POST request parameters including auth_token and auth_csrf.
// Returns a promise.
function updateItem(endpoint, item, options) {
  
  const {url, queryParams: {secret: client_secret, auth_token}} = options;

  const api_csrf = calculateCsrf(auth_token, client_secret);

  return throttle.enqueue()
    .then(function() {
      return new Promise(function(resolve, reject) {
        request
          .post(buildUrl(url, endpoint))
          .query({api_csrf, auth_token})
          .send(item)
          .end(function(err, response){
            if(err) {
              reject(response);
            } else {
              resolve(response);
            }
          });
      });
  });
}

function buildNonce(length = 10) {
    
    let nonce = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i=0; i < length; i++ ) {
      nonce += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return nonce;

}

// nonce = <random string, at least 10 characters long>
// timestamp = <current unix timestamp>
// hmac = base64_url_encode(hmac_sha256(CLIENT_ID + nonce + timestamp, CLIENT_SECRET))
// return base64_url_encode(nonce + ‘|’ + timestamp + ‘|’ + hmac)
function calculateCsrf(id, secret) {

  const nonce = buildNonce();
  const timestamp = new Date().getTime();

  const hmac = btoa(sha256(`${id}${nonce}${timestamp}`, secret));
  const csrf = btoa(`${nonce}|${timestamp}|${hmac}`);

  return csrf;

}

// Externally exposed functions /////////////////////////

function checkApiExists(options) {
  const {url, ...queryParams} = options;
  return getPage(url, HELP, queryParams)
    .then(result => {
      return result.status === 200;
    })
    .catch(result => false);
}

function queryEvent(options) {

  const {name} = options;

  return findItem('/api/events', {name}, options)
    .then(result => {
      if(result.event) {
        const {event: {id: event_id}} = result;
        const {queryParams} = options;
        return Promise.resolve({...result, ...options, queryParams: {...queryParams, event_id}});
      } else {
        throw('Unable to find event', result);
      }
    })
    .then(result => {
      const teamPromise = getAllItems('/api/teams', result);
      const registrationPromise = getAllItems('/api/registrations', result);
      return Promise.all([teamPromise, registrationPromise])
        .then((response) => {
          const [teams, registrations] = response;
          return Promise.resolve({
            ...result,
            teams,
            registrations,
          });
        });
    });
}

function queryEvents(options) {

  return getAllItems(EVENTS, options)
    .then(events => {
      const {queryParams, ...otherOptions} = options;
      return Promise.resolve({events, ...otherOptions, queryParams});
    });
}

function updatePlayerTeam(options) {

  let promiseChain = Promise.resolve();

  const {registrationId: id, teamId: team_id, role, ...otherOptions} = options;

  return updateItem(`${REGISTRATIONS}/edit`, {
    id,
    team_id,
    'roles[]': role,
  }, otherOptions);
}

/////////////////////////////////////////////////////////////////

export default {

  checkApiExists, // Functions
  getPage,
  queryEvent,
  queryEvents,
  updatePlayerTeam,

  HELP,  // Constants
  EVENTS,
  TEAMS,
  REGISTRATIONS,

}