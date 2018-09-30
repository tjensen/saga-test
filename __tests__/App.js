import React from 'react';
import {createStore, applyMiddleware, __getStore, __getAppliedMiddleware, __getRunSpy} from 'redux';
import createSagaMiddleware, {__getSagaMiddleware} from 'redux-saga';
import {Provider} from 'react-redux';
import TestRenderer from 'react-test-renderer';

import App from '../src/App';
import FormContainer from '../src/FormContainer';
import reducers from '../src/reducers';
import rootSaga from '../src/sagas';


jest.mock('redux', () => {
  const actualRedux = require.requireActual('redux');
  const fakeStore = {
    getState: jest.fn(() => ({})),
    subscribe: jest.fn(),
    dispatch: jest.fn()
  };

  return Object.assign({}, actualRedux, {
    createStore: jest.fn(() => fakeStore),
    applyMiddleware: jest.fn(() => 'APPLIED-MIDDLEWARE')
  });
});

jest.mock('redux-saga', () => {
  const fakeSagaMiddleware = {
    fake: 'SAGA-MIDDLEWARE',
    run: jest.fn()
  };
  return jest.fn(() => fakeSagaMiddleware);
});


describe('App', () => {
  it('creates Redux store', () => {
    expect(createSagaMiddleware).toHaveBeenCalledWith();
    expect(applyMiddleware).toHaveBeenCalledWith(createSagaMiddleware());
    expect(createStore).toHaveBeenCalledWith(reducers, 'APPLIED-MIDDLEWARE');
    expect(applyMiddleware.mock.calls[0][0].run).toHaveBeenCalledWith(rootSaga);
  });

  it('renders simple message', () => {
    const renderer = TestRenderer.create(<App/>);

    const provider = renderer.root.findByType(Provider);
    expect(provider.props.store).toEqual(createStore());

    const app = provider.findByProps({className: 'App'})
    expect(app.type).toEqual('div');

    const h1 = app.findByType('h1')
    expect(h1.props.children).toEqual('Hello, world!');

    const formContainer = app.findByType(FormContainer);
    expect(formContainer.props).toEqual({});
  });
});
