import React from 'react';
import TestRenderer from 'react-test-renderer';

import VideoEmbedData from '../../src/components/VideoEmbedData';


describe('VideoEmbedData', () => {
  it('renders html embed code and preview', () => {
    const renderer = TestRenderer.create(
      <VideoEmbedData
        html="<some>html</some>"
        width={480}
        height={270}
      />
    );

    const container = renderer.root.findByProps({id: 'video-embed-data'});
    expect(container.type).toEqual('div');

    const html = container.findByProps({id: 'embed-html'});
    expect(html.type).toEqual('textarea');
    expect(html.props).toEqual({
      id: 'embed-html',
      rows: 5,
      cols: 80,
      readOnly: true,
      value: '<some>html</some>'
    });

    const preview = container.findByProps({id: 'embed-preview'});
    expect(preview.type).toEqual('div');
    expect(preview.props).toEqual({
      id: 'embed-preview',
      style: 'width: 480px; height: 270px;',
      dangerouslySetInnerHTML: {
        __html: '<some>html</some>'
      }
    });
  });
});
