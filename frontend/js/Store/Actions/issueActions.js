import _ from 'lodash';
import { createAction } from 'redux-actions';
import { batchActions } from 'redux-batched-actions';
import createAjaxRequest from 'Utilities/createAjaxRequest';
import { sortDirections } from 'Helpers/Props';
import { createThunk, handleThunks } from 'Store/thunks';
import createSetClientSideCollectionSortReducer from './Creators/Reducers/createSetClientSideCollectionSortReducer';
import createSetTableOptionReducer from './Creators/Reducers/createSetTableOptionReducer';
import issueEntities from 'Issue/issueEntities';
import createFetchHandler from './Creators/createFetchHandler';
import createHandleActions from './Creators/createHandleActions';
import { updateItem } from './baseActions';

//
// Variables

export const section = 'issues';

//
// State

export const defaultState = {
  isFetching: false,
  isPopulated: false,
  error: null,
  sortKey: 'issueNumber',
  sortDirection: sortDirections.DESCENDING,
  items: [],

  columns: [
    {
      name: 'monitored',
      columnLabel: 'Monitored',
      isVisible: true,
      isModifiable: false
    },
    {
      name: 'issueNumber',
      label: '#',
      isVisible: true
    },
    {
      name: 'title',
      label: 'Title',
      isVisible: true
    },
    {
      name: 'path',
      label: 'Path',
      isVisible: false
    },
    {
      name: 'relativePath',
      label: 'Relative Path',
      isVisible: false
    },
    {
      name: 'storeDate',
      label: 'Store Date',
      isVisible: true
    },
    {
      name: 'coverDate',
      label: 'Cover Date',
      isVisible: true
    },
    {
      name: 'size',
      label: 'Size',
      isVisible: false
    },
    {
      name: 'status',
      label: 'Status',
      isVisible: true
    },
    {
      name: 'actions',
      columnLabel: 'Actions',
      isVisible: true,
      isModifiable: false
    }
  ]
};

export const persistState = [
  'issues.columns'
];

//
// Actions Types

export const FETCH_ISSUES = 'issues/fetchIssues';
export const SET_ISSUES_SORT = 'issues/setIssuesSort';
export const SET_ISSUES_TABLE_OPTION = 'issues/setIssuesTableOption';
export const CLEAR_ISSUES = 'issues/clearIssues';
export const TOGGLE_ISSUE_MONITORED = 'issues/toggleIssueMonitored';
export const TOGGLE_ISSUES_MONITORED = 'issues/toggleIssuesMonitored';

//
// Action Creators

export const fetchIssues = createThunk(FETCH_ISSUES);
export const setIssuesSort = createAction(SET_ISSUES_SORT);
export const setIssuesTableOption = createAction(SET_ISSUES_TABLE_OPTION);
export const clearIssues = createAction(CLEAR_ISSUES);
export const toggleIssueMonitored = createThunk(TOGGLE_ISSUE_MONITORED);
export const toggleIssuesMonitored = createThunk(TOGGLE_ISSUES_MONITORED);

//
// Action Handlers

export const actionHandlers = handleThunks({
  [FETCH_ISSUES]: createFetchHandler(section, '/issue'),

  [TOGGLE_ISSUE_MONITORED]: function(getState, payload, dispatch) {
    const {
      issueId: id,
      issueEntity = issueEntities.ISSUES,
      monitored
    } = payload;

    dispatch(updateItem({
      id,
      section: issueEntity,
      isSaving: true
    }));

    const promise = createAjaxRequest({
      url: `/issue/${id}`,
      method: 'PUT',
      data: JSON.stringify({ monitored }),
      dataType: 'json'
    }).request;

    promise.done((data) => {
      dispatch(updateItem({
        id,
        section: issueEntity,
        isSaving: false,
        monitored
      }));
    });

    promise.fail((xhr) => {
      dispatch(updateItem({
        id,
        section: issueEntity,
        isSaving: false
      }));
    });
  },

  [TOGGLE_ISSUES_MONITORED]: function(getState, payload, dispatch) {
    const {
      issueIds,
      issueEntity = issueEntities.ISSUES,
      monitored
    } = payload;

    const issueSection = _.last(issueEntity.split('.'));

    dispatch(batchActions(
      issueIds.map((issueId) => {
        return updateItem({
          id: issueId,
          section: issueSection,
          isSaving: true
        });
      })
    ));

    const promise = createAjaxRequest({
      url: '/issue/monitor',
      method: 'PUT',
      data: JSON.stringify({ issueIds, monitored }),
      dataType: 'json'
    }).request;

    promise.done((data) => {
      dispatch(batchActions(
        issueIds.map((issueId) => {
          return updateItem({
            id: issueId,
            section: issueSection,
            isSaving: false,
            monitored
          });
        })
      ));
    });

    promise.fail((xhr) => {
      dispatch(batchActions(
        issueIds.map((issueId) => {
          return updateItem({
            id: issueId,
            section: issueSection,
            isSaving: false
          });
        })
      ));
    });
  }
});

//
// Reducers

export const reducers = createHandleActions({

  [SET_ISSUES_TABLE_OPTION]: createSetTableOptionReducer(section),

  [CLEAR_ISSUES]: (state) => {
    return Object.assign({}, state, {
      isFetching: false,
      isPopulated: false,
      error: null,
      items: []
    });
  },

  [SET_ISSUES_SORT]: createSetClientSideCollectionSortReducer(section)

}, defaultState, section);
