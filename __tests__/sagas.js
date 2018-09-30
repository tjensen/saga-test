import {END, effects} from 'redux-saga';
import {expectSaga, providers} from 'redux-saga-test-plan';

import actions from '../src/actions';
import rootSaga from '../src/sagas';
import api from '../src/api';


describe('dispatching a start fetch embed action', () => {
  it('causes fetch embed completed to be dispatched on success', async () => {
    await expectSaga(rootSaga)
      .withState({serviceBaseURL: '/oembed'})
      .provide([
        [
          effects.call(api.fetchEmbed, '/oembed', 'https://blah/foo'),
          {html: '<some>html</some>'}
        ]
      ])
      .put(actions.fetchEmbedCompleted({html: '<some>html</some>'}))
      .dispatch(actions.startFetchEmbed('https://blah/foo'))
      .dispatch(END)
      .run();
  });

  it('causes fetch embed failed to be dispatched on error', async () => {
    await expectSaga(rootSaga)
      .withState({serviceBaseURL: '/oembed'})
      .provide([
        [
          effects.call(api.fetchEmbed, '/oembed', 'https://blah/foo'),
          providers.throwError(new Error('Server error'))
        ]
      ])
      .put(actions.fetchEmbedFailed('Error: Server error'))
      .dispatch(actions.startFetchEmbed('https://blah/foo'))
      .dispatch(END)
      .run();
  });
});
