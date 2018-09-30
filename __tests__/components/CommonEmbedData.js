import React from 'react';
import TestRenderer from 'react-test-renderer';

import CommonEmbedData from '../../src/components/CommonEmbedData';
import SimpleValue from '../../src/components/SimpleValue';
import LinkableName from '../../src/components/LinkableName';
import Thumbnail from '../../src/components/Thumbnail';


describe('CommonEmbedData', () => {
  it('renders common oembed response fields without any values', () => {
    const renderer = TestRenderer.create(
      <CommonEmbedData/>
    );

    const container = renderer.root.findByProps({id: 'common-embed-data'});
    expect(container.type).toEqual('div');

    const type = container.findByProps({id: 'embed-type'});
    expect(type.type).toEqual(SimpleValue);
    expect(type.props).toEqual({
      id: 'embed-type'
    });

    const version = container.findByProps({id: 'embed-version'});
    expect(version.type).toEqual(SimpleValue);
    expect(version.props).toEqual({
      id: 'embed-version'
    });

    const title = container.findByProps({id: 'embed-title'});
    expect(title.type).toEqual(SimpleValue);
    expect(title.props).toEqual({
      id: 'embed-title'
    });

    const author = container.findByProps({id: 'embed-author'});
    expect(author.type).toEqual(LinkableName);
    expect(author.props).toEqual({
      id: 'embed-author'
    });

    const provider = container.findByProps({id: 'embed-provider'});
    expect(provider.type).toEqual(LinkableName);
    expect(provider.props).toEqual({
      id: 'embed-provider'
    });

    const cacheAge = container.findByProps({id: 'embed-cache-age'});
    expect(cacheAge.type).toEqual(SimpleValue);
    expect(cacheAge.props).toEqual({
      id: 'embed-cache-age'
    });

    const thumbnail = container.findByType(Thumbnail);
    expect(thumbnail.props).toEqual({
      id: 'embed-thumbnail'
    });
  });

  it('renders common oembed response fields with all values', () => {
    const renderer = TestRenderer.create(
      <CommonEmbedData
        type="type"
        version="1.0"
        title="Some Title"
        authorName="Author Name"
        authorURL="https://author/url"
        providerName="Provider Name"
        providerURL="https://provider/url"
        cacheAge={3600}
        thumbnailURL="https://thumbnail/url"
        thumbnailWidth={320}
        thumbnailHeight={240}
      />
    );

    const type = renderer.root.findByProps({id: 'embed-type'});
    expect(type.props).toEqual({
      id: 'embed-type',
      value: 'type'
    });

    const version = renderer.root.findByProps({id: 'embed-version'});
    expect(version.props).toEqual({
      id: 'embed-version',
      value: '1.0'
    });

    const title = renderer.root.findByProps({id: 'embed-title'});
    expect(title.props).toEqual({
      id: 'embed-title',
      value: 'Some Title'
    });

    const author = renderer.root.findByProps({id: 'embed-author'});
    expect(author.props).toEqual({
      id: 'embed-author',
      name: 'Author Name',
      url: 'https://author/url'
    });

    const provider = renderer.root.findByProps({id: 'embed-provider'});
    expect(provider.props).toEqual({
      id: 'embed-provider',
      name: 'Provider Name',
      url: 'https://provider/url'
    });

    const cacheAge = renderer.root.findByProps({id: 'embed-cache-age'});
    expect(cacheAge.props).toEqual({
      id: 'embed-cache-age',
      value: 3600
    });

    const thumbnail = renderer.root.findByType(Thumbnail);
    expect(thumbnail.props).toEqual({
      id: 'embed-thumbnail',
      url: 'https://thumbnail/url',
      width: 320,
      height: 240
    });
  });
});
