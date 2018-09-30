import React from 'react';
import {Provider} from 'react-redux';
import TestRenderer from 'react-test-renderer';

import FormContainer from '../src/FormContainer';
import Form from '../src/Form';
import actions from '../src/actions';


describe('FormContainer', () => {
  let state;
  let store;
  let dispatched;

  beforeEach(() => {
    state = {
      fetching: false,
      embedData: {html: '<some>html</some>'},
      fetchError: 'some error'
    };
    dispatched = [];
    store = {
      getState: () => state,
      dispatch: (action) => dispatched.push(action),
      subscribe: () => {}
    };
  });

  it('renders a Form with props from state', () => {
    const renderer = TestRenderer.create(
      <Provider store={store}>
        <FormContainer/>
      </Provider>
    );
    const form = renderer.root.findByType(Form);

    expect(form.props).toEqual({
      fetching: false,
      embedHTML: '<some>html</some>',
      fetchError: 'some error',
      onSubmit: expect.anything()
    });
  });

  it('dispatches event to start fetching embed when submit button is clicked', () => {
    const renderer = TestRenderer.create(
      <Provider store={store}>
        <FormContainer/>
      </Provider>
    );
    const form = renderer.root.findByType(Form);

    form.props.onSubmit('service-base-url', 'resource-url');

    expect(dispatched).toEqual([
      actions.setServiceBaseURL('service-base-url'),
      actions.startFetchEmbed('resource-url')
    ]);
  });
});
