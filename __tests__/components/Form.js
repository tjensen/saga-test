import React from 'react';
import TestRenderer from 'react-test-renderer';
import Form from '../../src/components/Form';

describe('Form component', () => {
  it('renders form elements with default values', () => {
    const renderer = TestRenderer.create(<Form/>);

    const form = renderer.root.findByProps({id: 'fetch-embed-form'});
    expect(form.type).toEqual('div');
    expect(form.props).toEqual({
      id: 'fetch-embed-form',
      children: expect.anything()
    });

    const serviceBaseURL = form.findByProps({id: 'service-base-url'});
    expect(serviceBaseURL.type).toEqual('select');
    expect(serviceBaseURL.props).toEqual({
      id: 'service-base-url',
      value: 'http://www.youtube.com/oembed',
      onChange: expect.anything(),
      children: expect.anything()
    });
    const options = serviceBaseURL.findAllByType('option');
    expect(options.map((o) => o.props)).toEqual([
      {
        value: 'https://www.flickr.com/services/oembed/',
        children: 'Flickr'
      },
      {
        value: 'https://giphy.com/services/oembed',
        children: 'GIPHY'
      },
      {
        value: 'https://api.gfycat.com/v1/oembed',
        children: 'Gfycat'
      },
      {
        value: 'https://www.reddit.com/oembed',
        children: 'Reddit'
      },
      {
        value: 'https://soundcloud.com/oembed',
        children: 'SoundCloud'
      },
      {
        value: 'https://api.twitch.tv/v4/oembed',
        children: 'Twitch'
      },
      {
        value: 'https://publish.twitter.com/oembed',
        children: 'Twitter'
      },
      {
        value: 'http://www.youtube.com/oembed',
        children: 'Youtube'
      }
    ]);

    const resourceURL = form.findByProps({id: 'resource-url'});
    expect(resourceURL.type).toEqual('input');
    expect(resourceURL.props).toEqual({
      type: 'text',
      id: 'resource-url',
      value: '',
      placeholder: 'Resource URL',
      onChange: expect.anything()
    });

    const submit = form.findByProps({id: 'submit'});
    expect(submit.type).toEqual('button');
    expect(submit.props).toEqual({
      type: 'button',
      id: 'submit',
      disabled: false,
      onClick: expect.anything(),
      children: "Submit"
    });

    const error = form.findByProps({id: 'fetch-error'});
    expect(error.type).toEqual('div');
    expect(error.props).toEqual({
      id: 'fetch-error'
    });
  });

  it('renders fetch error message when set in props', () => {
    const renderer = TestRenderer.create(
      <Form fetchError="some error"/>
    );

    const error = renderer.root.findByProps({id: 'fetch-error'});
    expect(error.props.children).toEqual('some error');
  });

  it('disables the submit button when fetching is true', () => {
    const renderer = TestRenderer.create(
      <Form fetching={true}/>
    );

    const submit = renderer.root.findByProps({id: 'submit'});
    expect(submit.props.disabled).toBeTruthy();
  });

  it('calls onSubmit prop when submit button is clicked', () => {
    const onSubmit = jest.fn();
    const renderer = TestRenderer.create(<Form onSubmit={onSubmit}/>);
    const submit = renderer.root.findByProps({id: 'submit'});
    const serviceBaseURL = renderer.root.findByProps({id: 'service-base-url'});
    serviceBaseURL.props.onChange({target: {value: 'https://service/base'}});
    const resourceURL = renderer.root.findByProps({id: 'resource-url'});
    resourceURL.props.onChange({target: {value: 'https://resource/url'}});

    submit.props.onClick();

    expect(onSubmit).toHaveBeenCalledWith('https://service/base', 'https://resource/url');
  });
});
