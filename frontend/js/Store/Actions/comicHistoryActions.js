import { createAction } from 'redux-actions';
import { batchActions } from 'redux-batched-actions';
import createAjaxRequest from 'Utilities/createAjaxRequest';
import { createThunk, handleThunks } from 'Store/thunks';
import createHandleActions from './Creators/createHandleActions';
import { set, update } from './baseActions';

//
// Variables

export const section = 'comicHistory';

//
// State

export const defaultState = {
  isFetching: false,
  isPopulated: false,
  error: null,
  items: []
};

//
// Actions Types

export const FETCH_COMIC_HISTORY = 'comicHistory/fetchComicHistory';
export const CLEAR_COMIC_HISTORY = 'comicHistory/clearComicHistory';
export const COMIC_HISTORY_MARK_AS_FAILED = 'comicHistory/comicHistoryMarkAsFailed';

//
// Action Creators

export const fetchComicHistory = createThunk(FETCH_COMIC_HISTORY);
export const clearComicHistory = createAction(CLEAR_COMIC_HISTORY);
export const comicHistoryMarkAsFailed = createThunk(COMIC_HISTORY_MARK_AS_FAILED);

//
// Action Handlers

export const actionHandlers = handleThunks({

  [FETCH_COMIC_HISTORY]: function(getState, payload, dispatch) {
    dispatch(set({ section, isFetching: true }));

    const promise = createAjaxRequest({
      url: '/history/comic',
      data: payload
    }).request;

    promise.done((data) => {
      dispatch(batchActions([
        update({ section, data }),

        set({
          section,
          isFetching: false,
          isPopulated: true,
          error: null
        })
      ]));
    });

    promise.fail((xhr) => {
      dispatch(set({
        section,
        isFetching: false,
        isPopulated: false,
        error: xhr
      }));
    });
  },

  [COMIC_HISTORY_MARK_AS_FAILED]: function(getState, payload, dispatch) {
    const {
      historyId,
      comicId,
      seasonNumber
    } = payload;

    const promise = createAjaxRequest({
      url: '/history/failed',
      method: 'POST',
      data: {
        id: historyId
      }
    }).request;

    promise.done(() => {
      dispatch(fetchComicHistory({ comicId, seasonNumber }));
    });
  }
});

//
// Reducers

export const reducers = createHandleActions({

  [CLEAR_COMIC_HISTORY]: (state) => {
    return Object.assign({}, state, defaultState);
  }

}, defaultState, section);

