import {handleActions} from 'redux-actions';

import * as types from './types';


export const initialState = {
  serviceBaseURL: null,
  fetching: false,
  embedData: null,
  fetchError: null
};

const reducerMap = {
  [types.SET_SERVICE_BASE_URL]: (state, action) => {
    return {
      ...state,
      serviceBaseURL: action.payload
    };
  },
  [types.START_FETCH_EMBED]: (state) => {
    return {
      ...state,
      fetching: true
    };
  },
  [types.FETCH_EMBED_COMPLETED]: (state, action) => ({
    ...state,
    fetching: false,
    embedData: action.payload,
    fetchError: null
  }),
  [types.FETCH_EMBED_FAILED]: (state, action) => ({
    ...state,
    fetching: false,
    embedData: null,
    fetchError: action.payload.toString()
  })
}

export default handleActions(reducerMap, initialState);
