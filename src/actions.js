import {createAction} from 'redux-actions';

import * as types from './types';


export default {
  setServiceBaseURL: createAction(types.SET_SERVICE_BASE_URL),
  startFetchEmbed: createAction(types.START_FETCH_EMBED),
  fetchEmbedCompleted: createAction(types.FETCH_EMBED_COMPLETED),
  fetchEmbedFailed: createAction(types.FETCH_EMBED_FAILED)
};
