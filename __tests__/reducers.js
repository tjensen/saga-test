import reducers from '../src/reducers';
import * as actions from '../src/actions';


describe('serviceBaseURL reducers', () => {
  it('defaults to null', () => {
    const {serviceBaseURL} = reducers({}, {dont: 'care'});

    expect(serviceBaseURL).toBeNull();
  });

  it('sets serviceBaseURL', () => {
    const {serviceBaseURL} = reducers({}, actions.setServiceBaseURL('base/url'));

    expect(serviceBaseURL).toEqual('base/url');
  });
});
