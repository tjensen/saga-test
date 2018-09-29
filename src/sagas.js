import {call, put, select} from 'redux-saga/effects';

import api from './api';
import * as actions from './actions';


export function getServiceBaseURL(state) {
  return state.serviceBaseURL;
}

export function *fetchEmbed(url) {
  yield put(actions.start());
  const serviceBaseURL = yield select(getServiceBaseURL);
  try {
    const result = yield call(api.fetchEmbed, serviceBaseURL, url);
    yield put(actions.success(result.html));
  }
  catch (error) {
    yield put(actions.failure(error.toString()));
  }
}
