import React from 'react';
import TestRenderer from 'react-test-renderer';

import LinkableName from '../../src/components/LinkableName';


describe('LinkableName', () => {
  it('renders when name and url are not provided', () => {
    const renderer = TestRenderer.create(
      <LinkableName/>
    );

    const linkable = renderer.root.findByProps({className: 'linkable-name'});
    expect(linkable.type).toEqual('div');
    expect(linkable.props).toEqual({
      className: 'linkable-name'
    });
  });

  it('renders when only name is provided', () => {
    const renderer = TestRenderer.create(
      <LinkableName name="Jane Doe"/>
    );

    const linkable = renderer.root.findByProps({className: 'linkable-name'});
    expect(linkable.type).toEqual('div');
    expect(linkable.props).toEqual({
      className: 'linkable-name',
      children: 'Jane Doe'
    });
  });

  it('renders when only url is provided', () => {
    const renderer = TestRenderer.create(
      <LinkableName url="https://some/url"/>
    );

    const linkable = renderer.root.findByProps({className: 'linkable-name'});
    expect(linkable.type).toEqual('div');
    expect(linkable.props).toEqual({
      className: 'linkable-name',
      children: expect.anything()
    });

    const url = linkable.findByType('a');
    expect(url.props).toEqual({
      href: 'https://some/url',
      children: 'https://some/url'
    });
  });

  it('renders when name and url are provided', () => {
    const renderer = TestRenderer.create(
      <LinkableName name="John Doe" url="https://some/url"/>
    );

    const linkable = renderer.root.findByProps({className: 'linkable-name'});
    expect(linkable.type).toEqual('div');
    expect(linkable.props).toEqual({
      className: 'linkable-name',
      children: expect.anything()
    });

    const url = linkable.findByType('a');
    expect(url.props).toEqual({
      href: 'https://some/url',
      children: 'John Doe'
    });
  });
});
