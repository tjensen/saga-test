import {call, select} from 'redux-saga/effects';
import {testSaga, expectSaga} from 'redux-saga-test-plan';
import {throwError} from 'redux-saga-test-plan/providers';

import * as actions from '../src/actions';
import api from '../src/api';


describe('fetchEmbed', () => {
  it('dispatches success with html returned by oembed service', async () => {
    await expectSaga(actions.fetchEmbed, 'https://blah/foo')
      .provide([
        [select(actions.getServiceBaseURL), '/oembed'],
        [call(api.fetchEmbed, '/oembed', 'https://blah/foo'), {html: '<some>html</some>'}]
      ])
      .put(actions.start())
      .put(actions.success('<some>html</some>'))
      .run();
  });

  it('dispatches failure when oembed service returns error', async () => {
    await expectSaga(actions.fetchEmbed, 'https://blah/foo')
      .provide([
        [select(actions.getServiceBaseURL), '/oembed'],
        [call(api.fetchEmbed, '/oembed', 'https://blah/foo'), throwError(new Error('Server error'))]
      ])
      .put(actions.start())
      .put(actions.failure('Error: Server error'))
      .run();
  });
});
