import {call, put, select, takeEvery} from 'redux-saga/effects';

import api from './api';
import actions from './actions';


function* fetchEmbed(action) {
  const serviceBaseURL = yield select((state) => state.serviceBaseURL);
  try {
    const result = yield call(api.fetchEmbed, serviceBaseURL, action.payload);
    yield put(actions.fetchEmbedCompleted(result));
  }
  catch (error) {
    yield put(actions.fetchEmbedFailed(error.toString()));
  }
}

export default function* () {
  yield takeEvery(actions.startFetchEmbed, fetchEmbed);
}
