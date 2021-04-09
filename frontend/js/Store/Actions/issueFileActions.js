import _ from 'lodash';
import { createAction } from 'redux-actions';
import { batchActions } from 'redux-batched-actions';
import createAjaxRequest from 'Utilities/createAjaxRequest';
import { createThunk, handleThunks } from 'Store/thunks';
import issueEntities from 'Issue/issueEntities';
import createFetchHandler from './Creators/createFetchHandler';
import createHandleActions from './Creators/createHandleActions';
import createRemoveItemHandler from './Creators/createRemoveItemHandler';
import { set, removeItem, updateItem } from './baseActions';

//
// Variables

export const section = 'issueFiles';

//
// State

export const defaultState = {
  isFetching: false,
  isPopulated: false,
  error: null,
  isDeleting: false,
  deleteError: null,
  isSaving: false,
  saveError: null,
  items: []
};

//
// Actions Types

export const FETCH_ISSUE_FILE = 'issueFiles/fetchIssueFile';
export const FETCH_ISSUE_FILES = 'issueFiles/fetchIssueFiles';
export const DELETE_ISSUE_FILE = 'issueFiles/deleteIssueFile';
export const DELETE_ISSUE_FILES = 'issueFiles/deleteIssueFiles';
export const UPDATE_ISSUE_FILES = 'issueFiles/updateIssueFiles';
export const CLEAR_ISSUE_FILES = 'issueFiles/clearIssueFiles';

//
// Action Creators

export const fetchIssueFile = createThunk(FETCH_ISSUE_FILE);
export const fetchIssueFiles = createThunk(FETCH_ISSUE_FILES);
export const deleteIssueFile = createThunk(DELETE_ISSUE_FILE);
export const deleteIssueFiles = createThunk(DELETE_ISSUE_FILES);
export const updateIssueFiles = createThunk(UPDATE_ISSUE_FILES);
export const clearIssueFiles = createAction(CLEAR_ISSUE_FILES);

//
// Helpers

const deleteIssueFileHelper = createRemoveItemHandler(section, '/issueFile');

//
// Action Handlers

export const actionHandlers = handleThunks({
  [FETCH_ISSUE_FILE]: createFetchHandler(section, '/issueFile'),
  [FETCH_ISSUE_FILES]: createFetchHandler(section, '/issueFile'),

  [DELETE_ISSUE_FILE]: function(getState, payload, dispatch) {
    const {
      id: issueFileId,
      issueEntity = issueEntities.ISSUES
    } = payload;

    const issueSection = _.last(issueEntity.split('.'));
    const deletePromise = deleteIssueFileHelper(getState, payload, dispatch);

    deletePromise.done(() => {
      const issues = getState().issues.items;
      const issuesWithRemovedFiles = _.filter(issues, { issueFileId });

      dispatch(batchActions([
        ...issuesWithRemovedFiles.map((issue) => {
          return updateItem({
            section: issueSection,
            ...issue,
            issueFileId: 0,
            hasFile: false
          });
        })
      ]));
    });
  },

  [DELETE_ISSUE_FILES]: function(getState, payload, dispatch) {
    const {
      issueFileIds
    } = payload;

    dispatch(set({ section, isDeleting: true }));

    const promise = createAjaxRequest({
      url: '/issueFile/bulk',
      method: 'DELETE',
      dataType: 'json',
      data: JSON.stringify({ issueFileIds })
    }).request;

    promise.done(() => {
      const issues = getState().issues.items;
      const issuesWithRemovedFiles = issueFileIds.reduce((acc, issueFileId) => {
        acc.push(..._.filter(issues, { issueFileId }));

        return acc;
      }, []);

      dispatch(batchActions([
        ...issueFileIds.map((id) => {
          return removeItem({ section, id });
        }),

        ...issuesWithRemovedFiles.map((issue) => {
          return updateItem({
            section: 'issues',
            ...issue,
            issueFileId: 0,
            hasFile: false
          });
        }),

        set({
          section,
          isDeleting: false,
          deleteError: null
        })
      ]));
    });

    promise.fail((xhr) => {
      dispatch(set({
        section,
        isDeleting: false,
        deleteError: xhr
      }));
    });
  },

  [UPDATE_ISSUE_FILES]: function(getState, payload, dispatch) {
    const {
      issueFileIds,
      language,
      quality
    } = payload;

    dispatch(set({ section, isSaving: true }));

    const requestData = {
      issueFileIds
    };

    if (language) {
      requestData.language = language;
    }

    if (quality) {
      requestData.quality = quality;
    }

    const promise = createAjaxRequest({
      url: '/issueFile/editor',
      method: 'PUT',
      dataType: 'json',
      data: JSON.stringify(requestData)
    }).request;

    promise.done((data) => {
      dispatch(batchActions([
        ...issueFileIds.map((id) => {
          const props = {};

          const issueFile = data.find((file) => file.id === id);

          props.qualityCutoffNotMet = issueFile.qualityCutoffNotMet;
          props.languageCutoffNotMet = issueFile.languageCutoffNotMet;

          if (language) {
            props.language = language;
          }

          if (quality) {
            props.quality = quality;
          }

          return updateItem({ section, id, ...props });
        }),

        set({
          section,
          isSaving: false,
          saveError: null
        })
      ]));
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

  [CLEAR_ISSUE_FILES]: (state) => {
    return Object.assign({}, state, defaultState);
  }

}, defaultState, section);
