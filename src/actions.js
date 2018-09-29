import {call, put, select} from 'redux-saga/effects';

import api from './api';


const FETCH_EMBED_STARTED = 'FETCH_EMBED_STARTED';
const FETCH_EMBED_COMPLETED = 'FETCH_EMBED_COMPLETED';
const FETCH_EMBED_FAILED = 'FETCH_EMBED_FAILED';


export function start() {
  return {
    type: FETCH_EMBED_STARTED
  };
}

export function success(content) {
  return {
    type: FETCH_EMBED_COMPLETED,
    content
  };
}

export function failure(error) {
  return {
    type: FETCH_EMBED_FAILED,
    error
  };
}

export function getServiceBaseURL(state) {
  return state.serviceBaseURL;
}

export function *fetchEmbed(url) {
  yield put(start());
  const serviceBaseURL = yield select(getServiceBaseURL);
  try {
    const result = yield call(api.fetchEmbed, serviceBaseURL, url);
    yield put(success(result.html));
  }
  catch (error) {
    yield put(failure(error.toString()));
  }
}
