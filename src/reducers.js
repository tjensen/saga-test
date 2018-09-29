import {combineReducers} from 'redux';

import * as types from './types';


function serviceBaseURL(state = null, action) {
  switch (action.type) {
    case types.SET_SERVICE_BASE_URL:
      return action.url;
    default:
      return state;
  }
}

function fetching(state = false, action) {
  switch (action.type) {
    case types.START_FETCH_EMBED:
      return true;
    case types.FETCH_EMBED_COMPLETED:
    case types.FETCH_EMBED_FAILED:
      return false;
    default:
      return state;
  }
  return state;
}

function embedHTML(state = '', action) {
  switch (action.type) {
    case types.FETCH_EMBED_COMPLETED:
      return action.content;
    case types.FETCH_EMBED_FAILED:
      return '';
    default:
      return state;
  }
}

function fetchError(state = null, action) {
  switch (action.type) {
    case types.FETCH_EMBED_COMPLETED:
      return null;
    case types.FETCH_EMBED_FAILED:
      return action.error;
    default:
      return state;
  }
}

export default combineReducers({
  serviceBaseURL,
  fetching,
  embedHTML,
  fetchError
});
