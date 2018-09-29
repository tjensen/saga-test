import {call, select} from 'redux-saga/effects';
import {testSaga, expectSaga} from 'redux-saga-test-plan';
import {throwError} from 'redux-saga-test-plan/providers';

import * as actions from '../src/actions';
import rootSaga, {fetchEmbed} from '../src/sagas';
import api from '../src/api';


describe('fetchEmbed', () => {
  it('dispatches success with html returned by oembed service', async () => {
    await expectSaga(fetchEmbed, actions.startFetchEmbed('https://blah/foo'))
      .withState({serviceBaseURL: '/oembed'})
      .provide([
        [call(api.fetchEmbed, '/oembed', 'https://blah/foo'), {html: '<some>html</some>'}]
      ])
      .put(actions.fetchEmbedCompleted('<some>html</some>'))
      .run();
  });

  it('dispatches failure when oembed service returns error', async () => {
    await expectSaga(fetchEmbed, actions.startFetchEmbed('https://blah/foo'))
      .withState({serviceBaseURL: '/oembed'})
      .provide([
        [call(api.fetchEmbed, '/oembed', 'https://blah/foo'), throwError(new Error('Server error'))]
      ])
      .put(actions.fetchEmbedFailed('Error: Server error'))
      .run();
  });
});

describe('root saga', () => {
  it('invokes fetchEmbed saga when starting to fetch embed', async () => {
    await testSaga(rootSaga)
      .next()
      .takeEveryEffect(actions.startFetchEmbed().type, fetchEmbed)
      .finish()
      .isDone();
  });
});
