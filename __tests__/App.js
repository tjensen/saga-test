import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from '../src/App';


describe('App', () => {
  it('renders simple message', () => {
    const renderer = TestRenderer.create(<App/>);

    const h1 = renderer.root.findByType('h1')
    expect(h1.props.children).toEqual('Hello, world!');
  });
});
