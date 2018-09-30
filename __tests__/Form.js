import React from 'react';
import TestRenderer from 'react-test-renderer';
import Form from '../src/Form';

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
    expect(serviceBaseURL.type).toEqual('input');
    expect(serviceBaseURL.props).toEqual({
      type: 'text',
      id: 'service-base-url',
      value: '',
      placeholder: 'Service Base URL',
      onChange: expect.anything()
    });

    const resourceURL = form.findByProps({id: 'resource-url'});
    expect(resourceURL.type).toEqual('input');
    expect(resourceURL.props).toEqual({
      type: 'text',
      id: 'resource-url',
      value: '',
      placeholder: 'Resource URL',
      onChange: expect.anything()
    });

    const submit = form.findByType('button');
    expect(submit.props).toEqual({
      type: 'button',
      onClick: expect.anything(),
      children: "Submit"
    });

    const error = form.findByProps({id: 'fetch-error'});
    expect(error.type).toEqual('div');
    expect(error.props).toEqual({
      id: 'fetch-error'
    });

    const html = form.findByType('textarea');
    expect(html.props).toEqual({
      id: 'embed-html',
      rows: 5,
      cols: 80,
      readOnly: true
    });
  });

  it('renders form elements with values in props', () => {
    const renderer = TestRenderer.create(
      <Form
        embedHTML="<some>html</some>"
        fetchError="some error"
      />
    );

    const error = renderer.root.findByProps({id: 'fetch-error'});
    expect(error.props.children).toEqual('some error');

    const html = renderer.root.findByType('textarea');
    expect(html.props.value).toEqual('<some>html</some>');
  });

  it('calls onSubmit prop when submit button is clicked', () => {
    const onSubmit = jest.fn();
    const renderer = TestRenderer.create(<Form onSubmit={onSubmit}/>);
    const submit = renderer.root.findByType('button');
    const serviceBaseURL = renderer.root.findByProps({id: 'service-base-url'});
    serviceBaseURL.props.onChange({target: {value: 'https://service/base'}});
    const resourceURL = renderer.root.findByProps({id: 'resource-url'});
    resourceURL.props.onChange({target: {value: 'https://resource/url'}});

    submit.props.onClick();

    expect(onSubmit).toHaveBeenCalledWith('https://service/base', 'https://resource/url');
  });
});
