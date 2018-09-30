import React from 'react';
import TestRenderer from 'react-test-renderer';

import Thumbnail from '../../src/components/Thumbnail';


describe('Thumbnail', () => {
  it('renders when url is not provided', () => {
    const renderer = TestRenderer.create(
      <Thumbnail/>
    );

    const thumbnail = renderer.root.findByProps({className: 'thumbnail'});
    expect(thumbnail.type).toEqual('div');
    expect(thumbnail.props).toEqual({
      className: 'thumbnail'
    });
  });

  it('renders when url is provided', () => {
    const renderer = TestRenderer.create(
      <Thumbnail url="https://image/url" width={150} height={100}/>
    );

    const thumbnail = renderer.root.findByProps({className: 'thumbnail'});
    expect(thumbnail.type).toEqual('div');
    expect(thumbnail.props).toEqual({
      className: 'thumbnail',
      children: expect.anything()
    });

    const image = thumbnail.findByType('img');
    expect(image.props).toEqual({
      style: {
        width: '150px',
        height: '100px'
      },
      src: 'https://image/url'
    });
  });
});
