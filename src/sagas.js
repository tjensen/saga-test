import {call, put, select, takeEvery} from 'redux-saga/effects';

import api from './api';
import * as actions from './actions';


export function* fetchEmbed(action) {
  const serviceBaseURL = yield select((state) => state.serviceBaseURL);
  try {
    const result = yield call(api.fetchEmbed, serviceBaseURL, action.url);
    yield put(actions.success(result.html));
  }
  catch (error) {
    yield put(actions.failure(error.toString()));
  }
}

export default function* () {
  yield takeEvery(actions.startFetchEmbed().type, fetchEmbed);
}
