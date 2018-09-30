import reducers, {initialState} from '../src/reducers';
import actions from '../src/actions';


describe('reducers', () => {
  it('return initial state', () => {
    const state = reducers(undefined, {type: 'dont care'});

    expect(state).toEqual(initialState);
  });

  it('set service base URL', () => {
    const state = reducers(undefined, actions.setServiceBaseURL('base/url'));

    expect(state).toEqual({
      ...initialState,
      serviceBaseURL: 'base/url',
    });
  });

  it('set fetching to true when starting to fetch embed', () => {
    const state = reducers(undefined, actions.startFetchEmbed('some/resource'));

    expect(state).toEqual({
      ...initialState,
      fetching: true,
    });
  });

  it('clear error, set HTML, and clear fetching when fetching embed completes', () => {
    const state = reducers(
      {
        ...initialState,
        fetching: true,
        fetchError: 'some error'
      }, actions.fetchEmbedCompleted('html'));

    expect(state).toEqual({
      ...initialState,
      fetching: false,
      embedHTML: 'html',
      fetchError: null
    });
  });

  it('set error, clear HTML, and clear fetching when fetching embed fails', () => {
    const state = reducers(
      {
        ...initialState,
        fetching: true,
        embedHTML: 'html',
        fetchError: null
      }, actions.fetchEmbedFailed(new Error('some error')));

    expect(state).toEqual({
      ...initialState,
      fetching: false,
      embedHTML: '',
      fetchError: 'Error: some error'
    });
  });
});
