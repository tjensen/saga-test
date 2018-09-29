import {combineReducers} from 'redux';

import * as types from './types';


function serviceBaseURL(state = null, action) {
  switch (action.type) {
    case types.SET_SERVICE_BASE_URL:
      return action.url;
    default:
      return state;
  }
}

export default combineReducers({
  serviceBaseURL
});
