import {runSaga} from 'redux-saga';
import configureStore from 'redux-mock-store';
import fetchMock from 'jest-fetch-mock';

import * as actions from '../src/actions';


const mockStore = configureStore([]);


describe('fetchEmbed', () => {
  let state;
  let store;
  let dispatched;

  function run(saga, ...args) {
    return runSaga(
      {
        dispatch: (action) => store.dispatch(action),
        getState: () => store.getState()
      },
      saga,
      ...args).done;
  }

  beforeEach(() => {
    state = {};
    store = mockStore(state);
    dispatched = [];

    fetchMock.resetMocks();
    global.fetch = fetchMock;
  });

  it('dispatches success with html returned by oembed service', () => {
    state.serviceBaseURL = '/oembed';
    fetchMock.mockResponse(JSON.stringify({
      html: '<some>html</some>'
    }));

    return run(actions.fetchEmbed, 'https://blah/foo')
      .then(() => {
        expect(store.getActions()).toEqual([
          actions.start(),
          actions.success({html: '<some>html</some>'})
        ]);
        expect(fetchMock).toHaveBeenCalledWith('/oembed?format=json&url=https%3A%2F%2Fblah%2Ffoo');
      });
  });
});
