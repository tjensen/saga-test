import reducers from '../src/reducers';
import * as actions from '../src/actions';


describe('serviceBaseURL reducer', () => {
  it('defaults to null', () => {
    const {serviceBaseURL} = reducers({}, {dont: 'care'});

    expect(serviceBaseURL).toBeNull();
  });

  it('sets serviceBaseURL', () => {
    const {serviceBaseURL} = reducers({}, actions.setServiceBaseURL('base/url'));

    expect(serviceBaseURL).toEqual('base/url');
  });
});

describe('fetching reducer', () => {
  it('defaults to false', () => {
    const {fetching} = reducers({}, {dont: 'care'});

    expect(fetching).toBeFalsy();
  });

  it('sets fetching to true when starting to fetch embed', () => {
    const {fetching} = reducers({}, actions.startFetchEmbed('some/resource'));

    expect(fetching).toBeTruthy();
  });

  it('sets fetching to false when fetching embed completes', () => {
    const {fetching} = reducers({fetching: true}, actions.fetchEmbedCompleted('html'));

    expect(fetching).toBeFalsy();
  });

  it('sets fetching to false when fetching embed fails', () => {
    const {fetching} = reducers({fetching: true}, actions.fetchEmbedCompleted('html'));

    expect(fetching).toBeFalsy();
  });
});

describe('embedHTML reducer', () => {
  it('defaults to empty string', () => {
    const {embedHTML} = reducers({}, {dont: 'care'});

    expect(embedHTML).toEqual('');
  });

  it('sets embedHTML when fetching embed completes', () => {
    const {embedHTML} = reducers({}, actions.fetchEmbedCompleted('<some>html</some>'));

    expect(embedHTML).toEqual('<some>html</some>');
  });

  it('sets embedHTML to empty string when fetching embed fails', () => {
    const {embedHTML} = reducers(
      {embedHTML: 'not empty'},
      actions.fetchEmbedFailed('some error'));

    expect(embedHTML).toEqual('');
  });
});

describe('fetchError reducer', () => {
  it('defaults to null', () => {
    const {fetchError} = reducers({}, {dont: 'care'});

    expect(fetchError).toBeNull();
  });

  it('sets fetchError to null when fetching embed completes', () => {
    const {fetchError} = reducers({}, actions.fetchEmbedCompleted('some html'));

    expect(fetchError).toBeNull();
  });

  it('sets fetchError when fetching embed fails', () => {
    const {fetchError} = reducers({}, actions.fetchEmbedFailed('some error'));

    expect(fetchError).toEqual('some error');
  });
});
