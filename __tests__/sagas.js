import {call, select} from 'redux-saga/effects';
import {testSaga, expectSaga} from 'redux-saga-test-plan';
import {throwError} from 'redux-saga-test-plan/providers';

import * as actions from '../src/actions';
import rootSaga, * as sagas from '../src/sagas';
import api from '../src/api';


describe('fetchEmbed', () => {
  it('dispatches success with html returned by oembed service', async () => {
    await expectSaga(sagas.fetchEmbed, actions.startFetchEmbed('https://blah/foo'))
      .provide([
        [select(sagas.getServiceBaseURL), '/oembed'],
        [call(api.fetchEmbed, '/oembed', 'https://blah/foo'), {html: '<some>html</some>'}]
      ])
      .put(actions.success('<some>html</some>'))
      .run();
  });

  it('dispatches failure when oembed service returns error', async () => {
    await expectSaga(sagas.fetchEmbed, actions.startFetchEmbed('https://blah/foo'))
      .provide([
        [select(sagas.getServiceBaseURL), '/oembed'],
        [call(api.fetchEmbed, '/oembed', 'https://blah/foo'), throwError(new Error('Server error'))]
      ])
      .dispatch(actions.startFetchEmbed('https://blah/foo'))
      .run();
  });
});

describe('root saga', () => {
  it('invokes fetchEmbed saga when starting to fetch embed', async () => {
    await testSaga(rootSaga)
      .next()
      .takeEveryEffect(actions.startFetchEmbed().type, sagas.fetchEmbed)
      .finish()
      .isDone();
  });
});
