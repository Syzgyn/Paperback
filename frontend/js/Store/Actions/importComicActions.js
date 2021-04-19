import _ from 'lodash';
import { createAction } from 'redux-actions';
import { batchActions } from 'redux-batched-actions';
import createAjaxRequest from 'Utilities/createAjaxRequest';
import getSectionState from 'Utilities/State/getSectionState';
import updateSectionState from 'Utilities/State/updateSectionState';
import getNewComic from 'Utilities/Comic/getNewComic';
import * as comicTypes from 'Utilities/Comic/comicTypes';
import { createThunk, handleThunks } from 'Store/thunks';
import createHandleActions from './Creators/createHandleActions';
import { set, removeItem, updateItem } from './baseActions';
import { fetchRootFolders } from './rootFolderActions';

//
// Variables

export const section = 'importComic';
let concurrentLookups = 0;
let abortCurrentLookup = null;
const queue = [];

//
// State

export const defaultState = {
  isLookingUpComic: false,
  isImporting: false,
  isImported: false,
  importError: null,
  items: []
};

//
// Actions Types

export const QUEUE_LOOKUP_COMIC = 'importComic/queueLookupComic';
export const START_LOOKUP_COMIC = 'importComic/startLookupComic';
export const CANCEL_LOOKUP_COMIC = 'importComic/cancelLookupComic';
export const LOOKUP_UNSEARCHED_COMIC = 'importComic/lookupUnsearchedComic';
export const CLEAR_IMPORT_COMIC = 'importComic/clearImportComic';
export const SET_IMPORT_COMIC_VALUE = 'importComic/setImportComicValue';
export const IMPORT_COMIC = 'importComic/importComic';

//
// Action Creators

export const queueLookupComic = createThunk(QUEUE_LOOKUP_COMIC);
export const startLookupComic = createThunk(START_LOOKUP_COMIC);
export const importComic = createThunk(IMPORT_COMIC);
export const lookupUnsearchedComic = createThunk(LOOKUP_UNSEARCHED_COMIC);
export const clearImportComic = createAction(CLEAR_IMPORT_COMIC);
export const cancelLookupComic = createAction(CANCEL_LOOKUP_COMIC);

export const setImportComicValue = createAction(SET_IMPORT_COMIC_VALUE, (payload) => {
  return {
    section,
    ...payload
  };
});

//
// Action Handlers

export const actionHandlers = handleThunks({

  [QUEUE_LOOKUP_COMIC]: function(getState, payload, dispatch) {
    const {
      name,
      path,
      term,
      topOfQueue = false
    } = payload;

    const state = getState().importComic;
    const item = _.find(state.items, { id: name }) || {
      id: name,
      term,
      path,
      isFetching: false,
      isPopulated: false,
      error: null
    };

    dispatch(updateItem({
      section,
      ...item,
      term,
      isQueued: true,
      items: []
    }));

    const itemIndex = queue.indexOf(item.id);

    if (itemIndex >= 0) {
      queue.splice(itemIndex, 1);
    }

    if (topOfQueue) {
      queue.unshift(item.id);
    } else {
      queue.push(item.id);
    }

    if (term && term.length > 2) {
      dispatch(startLookupComic({ start: true }));
    }
  },

  [START_LOOKUP_COMIC]: function(getState, payload, dispatch) {
    if (concurrentLookups >= 1) {
      return;
    }

    const state = getState().importComic;

    const {
      isLookingUpComic,
      items
    } = state;

    const queueId = queue[0];

    if (payload.start && !isLookingUpComic) {
      dispatch(set({ section, isLookingUpComic: true }));
    } else if (!isLookingUpComic) {
      return;
    } else if (!queueId) {
      dispatch(set({ section, isLookingUpComic: false }));
      return;
    }

    concurrentLookups++;
    queue.splice(0, 1);

    const queued = items.find((i) => i.id === queueId);

    dispatch(updateItem({
      section,
      id: queued.id,
      isFetching: true
    }));

    const { request, abortRequest } = createAjaxRequest({
      url: '/comic/lookup',
      data: {
        term: queued.term
      }
    });

    abortCurrentLookup = abortRequest;

    request.done((data) => {
      const selectedComic = queued.selectedComic || data[0];

      const itemProps = {
        section,
        id: queued.id,
        isFetching: false,
        isPopulated: true,
        error: null,
        items: data,
        isQueued: false,
        selectedComic,
        updateOnly: true
      };

      if (selectedComic && selectedComic.comicType !== comicTypes.STANDARD) {
        itemProps.comicType = selectedComic.comicType;
      }

      dispatch(updateItem(itemProps));
    });

    request.fail((xhr) => {
      dispatch(updateItem({
        section,
        id: queued.id,
        isFetching: false,
        isPopulated: false,
        error: xhr,
        isQueued: false,
        updateOnly: true
      }));
    });

    request.always(() => {
      concurrentLookups--;

      dispatch(startLookupComic());
    });
  },

  [LOOKUP_UNSEARCHED_COMIC]: function(getState, payload, dispatch) {
    const state = getState().importComic;

    if (state.isLookingUpComic) {
      return;
    }

    state.items.forEach((item) => {
      const id = item.id;

      if (
        !item.isPopulated &&
        !queue.includes(id)
      ) {
        queue.push(item.id);
      }
    });

    if (queue.length) {
      dispatch(startLookupComic({ start: true }));
    }
  },

  [IMPORT_COMIC]: function(getState, payload, dispatch) {
    dispatch(set({ section, isImporting: true }));

    const ids = payload.ids;
    const items = getState().importComic.items;
    const addedIds = [];

    const allNewComic = ids.reduce((acc, id) => {
      const item = items.find((i) => i.id === id);
      const selectedComic = item.selectedComic;

      // Make sure we have a selected comic and
      // the same comic hasn't been added yet.
      if (selectedComic && !acc.some((a) => a.cvid === selectedComic.cvid)) {
        const newComic = getNewComic(_.cloneDeep(selectedComic), item);
        newComic.path = item.path;

        addedIds.push(id);
        acc.push(newComic);
      }

      return acc;
    }, []);

    const promise = createAjaxRequest({
      url: '/comic/import',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(allNewComic)
    }).request;

    promise.done((data) => {
      dispatch(batchActions([
        set({
          section,
          isImporting: false,
          isImported: true,
          importError: null
        }),

        ...data.map((comic) => updateItem({ section: 'comic', ...comic })),

        ...addedIds.map((id) => removeItem({ section, id }))
      ]));

      dispatch(fetchRootFolders());
    });

    promise.fail((xhr) => {
      dispatch(batchActions([
        set({
          section,
          isImporting: false,
          isImported: true,
          importError: xhr
        }),

        ...addedIds.map((id) => updateItem({
          section,
          id
        }))
      ]));
    });
  }
});

//
// Reducers

export const reducers = createHandleActions({

  [CANCEL_LOOKUP_COMIC]: function(state) {
    queue.splice(0, queue.length);

    const items = state.items.map((item) => {
      if (item.isQueued) {
        return {
          ...item,
          isQueued: false
        };
      }

      return item;
    });

    return Object.assign({}, state, {
      isLookingUpComic: false,
      items
    });
  },

  [CLEAR_IMPORT_COMIC]: function(state) {
    if (abortCurrentLookup) {
      abortCurrentLookup();

      abortCurrentLookup = null;
    }

    queue.splice(0, queue.length);

    return Object.assign({}, state, defaultState);
  },

  [SET_IMPORT_COMIC_VALUE]: function(state, { payload }) {
    const newState = getSectionState(state, section);
    const items = newState.items;
    const index = items.findIndex((item) => item.id === payload.id);

    newState.items = [...items];

    if (index >= 0) {
      const item = items[index];

      newState.items.splice(index, 1, { ...item, ...payload });
    } else {
      newState.items.push({ ...payload });
    }

    return updateSectionState(state, section, newState);
  }

}, defaultState, section);
