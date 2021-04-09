import { createAction } from 'redux-actions';
import createAjaxRequest from 'Utilities/createAjaxRequest';
import { sortDirections } from 'Helpers/Props';
import { createThunk, handleThunks } from 'Store/thunks';
import createSetClientSideCollectionSortReducer from './Creators/Reducers/createSetClientSideCollectionSortReducer';
import createSetClientSideCollectionFilterReducer from './Creators/Reducers/createSetClientSideCollectionFilterReducer';
import createHandleActions from './Creators/createHandleActions';
import { set } from './baseActions';
import { fetchComic, filters, filterPredicates, filterBuilderProps } from './comicActions';

//
// Variables

export const section = 'seasonPass';

//
// State

export const defaultState = {
  isSaving: false,
  saveError: null,
  sortKey: 'sortTitle',
  sortDirection: sortDirections.ASCENDING,
  secondarySortKey: 'sortTitle',
  secondarySortDirection: sortDirections.ASCENDING,
  selectedFilterKey: 'all',
  filters,
  filterPredicates,

  filterBuilderProps
};

export const persistState = [
  'seasonPass.sortKey',
  'seasonPass.sortDirection',
  'seasonPass.selectedFilterKey',
  'seasonPass.customFilters'
];

//
// Actions Types

export const SET_SEASON_PASS_SORT = 'seasonPass/setSeasonPassSort';
export const SET_SEASON_PASS_FILTER = 'seasonPass/setSeasonPassFilter';
export const SAVE_SEASON_PASS = 'seasonPass/saveSeasonPass';

//
// Action Creators

export const setSeasonPassSort = createAction(SET_SEASON_PASS_SORT);
export const setSeasonPassFilter = createAction(SET_SEASON_PASS_FILTER);
export const saveSeasonPass = createThunk(SAVE_SEASON_PASS);

//
// Action Handlers

export const actionHandlers = handleThunks({

  [SAVE_SEASON_PASS]: function(getState, payload, dispatch) {
    const {
      comicIds,
      monitored,
      monitor
    } = payload;

    const comic = [];

    comicIds.forEach((id) => {
      const comicToUpdate = { id };

      if (payload.hasOwnProperty('monitored')) {
        comicToUpdate.monitored = monitored;
      }

      comic.push(comicToUpdate);
    });

    dispatch(set({
      section,
      isSaving: true
    }));

    const promise = createAjaxRequest({
      url: '/seasonPass',
      method: 'POST',
      data: JSON.stringify({
        comic,
        monitoringOptions: { monitor }
      }),
      dataType: 'json'
    }).request;

    promise.done((data) => {
      dispatch(fetchComic());

      dispatch(set({
        section,
        isSaving: false,
        saveError: null
      }));
    });

    promise.fail((xhr) => {
      dispatch(set({
        section,
        isSaving: false,
        saveError: xhr
      }));
    });
  }

});

//
// Reducers

export const reducers = createHandleActions({

  [SET_SEASON_PASS_SORT]: createSetClientSideCollectionSortReducer(section),
  [SET_SEASON_PASS_FILTER]: createSetClientSideCollectionFilterReducer(section)

}, defaultState, section);

