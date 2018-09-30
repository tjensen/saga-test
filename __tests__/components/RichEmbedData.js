import React from 'react';
import TestRenderer from 'react-test-renderer';

import RichEmbedData from '../../src/components/RichEmbedData';


describe('RichEmbedData', () => {
  it('renders html embed code and preview', () => {
    const renderer = TestRenderer.create(
      <RichEmbedData
        html="<some>html</some>"
        width={480}
        height={270}
      />
    );

    const container = renderer.root.findByProps({className: 'rich-embed-data'});
    expect(container.type).toEqual('div');

    const html = container.findByProps({className: 'embed-html'});
    expect(html.type).toEqual('textarea');
    expect(html.props).toEqual({
      className: 'embed-html',
      rows: 5,
      cols: 80,
      readOnly: true,
      value: '<some>html</some>'
    });

    const preview = container.findByProps({className: 'embed-preview'});
    expect(preview.type).toEqual('div');
    expect(preview.props).toEqual({
      className: 'embed-preview',
      style: {
        width: '480px',
        height: '270px'
      },
      dangerouslySetInnerHTML: {
        __html: '<some>html</some>'
      }
    });
  });
});
