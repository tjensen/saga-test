import React from 'react';
import {Provider} from 'react-redux';
import TestRenderer from 'react-test-renderer';

import EmbedDataContainer from '../../src/containers/EmbedDataContainer';
import CommonEmbedData from '../../src/components/CommonEmbedData';
import RichEmbedData from '../../src/components/RichEmbedData';


describe('EmbedDataContainer', () => {
  let state;
  let store;
  let dispatched;

  beforeEach(() => {
    state = {
      embedData: null
    };
    dispatched = [];
    store = {
      getState: () => state,
      dispatch: (action) => dispatched.push(action),
      subscribe: () => {}
    };
  });

  it('informs user to click submit to view an embed when embedData is null', () => {
    const renderer = TestRenderer.create(
      <Provider store={store}>
        <EmbedDataContainer/>
      </Provider>
    );

    const container = renderer.root.findByProps({className: 'embed-data-container'});
    expect(container.type).toEqual('div');
    expect(container.props).toEqual({
      className: 'embed-data-container',
      children: 'Click "Submit" button to view an embed'
    });

    expect(container.findAllByType(CommonEmbedData)).toHaveLength(0);
    expect(container.findAllByType(RichEmbedData)).toHaveLength(0);
  });

  it('renders common embed data when embedData is empty', () => {
    state.embedData = {
    };

    const renderer = TestRenderer.create(
      <Provider store={store}>
        <EmbedDataContainer/>
      </Provider>
    );

    const container = renderer.root.findByProps({className: 'embed-data-container'});
    expect(container.props.children).not.toContain('Click "Submit" button to view an embed');

    const common = container.findByType(CommonEmbedData);
    expect(common.props).toEqual({});

    expect(container.findAllByType(RichEmbedData)).toHaveLength(0);
  });

  it('renders common embed data when embedData is fully populated with optional fields', () => {
    state.embedData = {
      type: 'link',
      version: '1.0',
      title: 'Some Title',
      author_name: 'Author Name',
      author_url: 'https://author/url',
      provider_name: 'Provider Name',
      provider_url: 'https://provider/url',
      cache_age: 86400,
      thumbnail_url: 'https://thumbnail/url',
      thumbnail_width: 160,
      thumbnail_height: 120
    };

    const renderer = TestRenderer.create(
      <Provider store={store}>
        <EmbedDataContainer/>
      </Provider>
    );

    const container = renderer.root.findByProps({className: 'embed-data-container'});
    expect(container.props.children).not.toContain('Click "Submit" button to view an embed');

    const common = container.findByType(CommonEmbedData);
    expect(common.props).toEqual({
      type: 'link',
      version: '1.0',
      title: 'Some Title',
      authorName: 'Author Name',
      authorURL: 'https://author/url',
      providerName: 'Provider Name',
      providerURL: 'https://provider/url',
      cacheAge: 86400,
      thumbnailURL: 'https://thumbnail/url',
      thumbnailWidth: 160,
      thumbnailHeight: 120
    });

    expect(container.findAllByType(RichEmbedData)).toHaveLength(0);
  });

  it('renders common embed data and video embed data when type is video', () => {
    state.embedData = {
      type: 'video',
      html: '<some>html</some>',
      width: 640,
      height: 480
    };

    const renderer = TestRenderer.create(
      <Provider store={store}>
        <EmbedDataContainer/>
      </Provider>
    );

    const container = renderer.root.findByProps({className: 'embed-data-container'});
    expect(container.props.children).not.toContain('Click "Submit" button to view an embed');

    expect(container.findAllByType(CommonEmbedData)).toHaveLength(1);

    const rich = container.findByType(RichEmbedData);
    expect(rich.props).toEqual({
      html: '<some>html</some>',
      width: 640,
      height: 480
    });
  });
});
