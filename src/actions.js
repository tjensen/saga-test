import * as types from './types';


export function setServiceBaseURL(url) {
  return {
    type: types.SET_SERVICE_BASE_URL,
    url
  }
};

export function startFetchEmbed(url) {
  return {
    type: types.START_FETCH_EMBED,
    url
  };
};

export function start() {
  return {
    type: types.FETCH_EMBED_STARTED
  };
};

export function success(content) {
  return {
    type: types.FETCH_EMBED_COMPLETED,
    content
  };
};

export function failure(error) {
  return {
    type: types.FETCH_EMBED_FAILED,
    error
  };
};
