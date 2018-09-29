import {call, put, select} from 'redux-saga/effects';


const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';


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

export function *fetchEmbed(url) {
  const serviceBaseURL = yield select((state) => state.serviceBaseURL);
  yield put(start());
  const result = yield call(
    fetch, `${serviceBaseURL}?format=json&url=${encodeURIComponent(url)}`);
  const json = yield call([result, 'json']);
  yield put(success(json));
}
