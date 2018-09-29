import {call, put, select} from 'redux-saga/effects';

import api from './api';


const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';


export function start() {
  return {
    type: FETCH_START
  };
}

export function success(content) {
  return {
    type: FETCH_SUCCESS,
    content
  };
}

export function failure(error) {
  return {
    type: FETCH_FAILURE,
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
