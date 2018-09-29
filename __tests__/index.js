import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';

describe('index', () => {
  let renderSpy;
  let getElementByIdSpy;

  beforeEach(() => {
    renderSpy = jest.spyOn(ReactDOM, 'render').mockReturnValue();
    getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValue('ROOT-ELEMENT');
  });

  it('renders the App into the DOM at the `root` element', () => {
    require('../src/index');

    expect(getElementByIdSpy).toHaveBeenCalledWith('root');
    expect(renderSpy).toHaveBeenCalledWith(<App/>, 'ROOT-ELEMENT');
  });
});
