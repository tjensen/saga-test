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

export function fetchEmbedCompleted(content) {
  return {
    type: types.FETCH_EMBED_COMPLETED,
    content
  };
};

export function fetchEmbedFailed(error) {
  return {
    type: types.FETCH_EMBED_FAILED,
    error
  };
};
