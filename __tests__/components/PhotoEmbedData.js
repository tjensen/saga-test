import React from 'react';
import TestRenderer from 'react-test-renderer';

import PhotoEmbedData from '../../src/components/PhotoEmbedData';
import LinkableName from '../../src/components/LinkableName';


describe('PhotoEmbedData', () => {
  it('renders url and preview', () => {
    const renderer = TestRenderer.create(
      <PhotoEmbedData
        url="https://image/url"
        width={480}
        height={270}
      />
    );

    const container = renderer.root.findByProps({className: 'photo-embed-data'});
    expect(container.type).toEqual('div');

    const url = container.findByProps({className: 'embed-url'});
    expect(url.type).toEqual(LinkableName);
    expect(url.props).toEqual({
      className: 'embed-url',
      url: 'https://image/url'
    });

    const preview = container.findByProps({className: 'embed-preview'});
    expect(preview.type).toEqual('div');
    expect(preview.props).toEqual({
      className: 'embed-preview',
      style: {
        width: '480px',
        height: '270px'
      },
      children: expect.anything()
    });

    const img = preview.findByType('img');
    expect(img.props).toEqual({
      style: {
        width: '480px',
        height: '270px'
      },
      src: 'https://image/url'
    });
  });
});
