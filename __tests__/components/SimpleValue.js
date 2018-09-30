import React from 'react';
import TestRenderer from 'react-test-renderer';

import SimpleValue from '../../src/components/SimpleValue';


describe('SimpleValue', () => {
  it('renders when value is not provided', () => {
    const renderer = TestRenderer.create(
      <SimpleValue/>
    );

    const value = renderer.root.findByProps({className: 'simple-value'});
    expect(value.type).toEqual('input');
    expect(value.props).toEqual({
      className: 'simple-value',
      type: 'text',
      readOnly: true,
      placeholder: 'not set'
    });
  });

  it('renders with id when provided', () => {
    const renderer = TestRenderer.create(
      <SimpleValue id="some-id"/>
    );

    const value = renderer.root.findByProps({className: 'simple-value'});
    expect(value.props).toEqual({
      className: 'simple-value',
      id: 'some-id',
      type: 'text',
      readOnly: true,
      placeholder: 'not set'
    });
  });

  it('renders when value is provided', () => {
    const renderer = TestRenderer.create(
      <SimpleValue value="This is a value"/>
    );

    const value = renderer.root.findByProps({className: 'simple-value'});
    expect(value.props).toEqual({
      className: 'simple-value',
      type: 'text',
      readOnly: true,
      placeholder: 'not set',
      value: 'This is a value'
    });
  });
});
