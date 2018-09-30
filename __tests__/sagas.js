import {testSaga, expectSaga} from 'redux-saga-test-plan';
import fetchMock from 'jest-fetch-mock';

import actions from '../src/actions';
import rootSaga, {fetchEmbed} from '../src/sagas';
import api from '../src/api';


describe('fetchEmbed', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    global.fetch = fetchMock;
  });

  it('dispatches success with html returned by oembed service', async () => {
    fetchMock.mockResponse(JSON.stringify({
      html: '<some>html</some>'
    }));

    await expectSaga(fetchEmbed, actions.startFetchEmbed('https://blah/foo'))
      .withState({serviceBaseURL: '/oembed'})
      .put(actions.fetchEmbedCompleted('<some>html</some>'))
      .run();
  });

  it('dispatches failure when oembed service returns error', async () => {
    fetchMock.mockReject(new Error('Server error'));

    await expectSaga(fetchEmbed, actions.startFetchEmbed('https://blah/foo'))
      .withState({serviceBaseURL: '/oembed'})
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
