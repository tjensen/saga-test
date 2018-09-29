import * as types from './types';


export function start() {
  return {
    type: types.FETCH_EMBED_STARTED
  };
}

export function success(content) {
  return {
    type: types.FETCH_EMBED_COMPLETED,
    content
  };
}

export function failure(error) {
  return {
    type: types.FETCH_EMBED_FAILED,
    error
  };
}
