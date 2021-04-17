import { createAction } from 'redux-actions';
import { batchActions } from 'redux-batched-actions';
import createAjaxRequest from 'Utilities/createAjaxRequest';
import { sortDirections } from 'Helpers/Props';
import { createThunk, handleThunks } from 'Store/thunks';
import createSetTableOptionReducer from './Creators/Reducers/createSetTableOptionReducer';
import createSetClientSideCollectionSortReducer from './Creators/Reducers/createSetClientSideCollectionSortReducer';
import createSetClientSideCollectionFilterReducer from './Creators/Reducers/createSetClientSideCollectionFilterReducer';
import createHandleActions from './Creators/createHandleActions';
import { set, updateItem } from './baseActions';
import { filters, filterPredicates, filterBuilderProps, sortPredicates } from './comicActions';

//
// Variables

export const section = 'comicEditor';

//
// State

export const defaultState = {
  isSaving: false,
  saveError: null,
  isDeleting: false,
  deleteError: null,
  sortKey: 'sortTitle',
  sortDirection: sortDirections.ASCENDING,
  secondarySortKey: 'sortTitle',
  secondarySortDirection: sortDirections.ASCENDING,
  sortPredicates,
  selectedFilterKey: 'all',
  filters,
  filterPredicates,

  columns: [
    {
      name: 'status',
      columnLabel: 'Status',
      isSortable: true,
      isVisible: true,
      isModifiable: false
    },
    {
      name: 'sortTitle',
      label: 'Comic Title',
      isSortable: true,
      isVisible: true,
      isModifiable: false
    },
    {
      name: 'year',
      label: 'Year',
      isSortable: true,
      isVisible: true,
    },
    {
      name: 'numIssues',
      label: 'Number of Issues',
      isSortable: true,
      isVisible: true,
    },
    {
      name: 'path',
      label: 'Path',
      isSortable: true,
      isVisible: true
    },
    {
      name: 'sizeOnDisk',
      label: 'Size on Disk',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'tags',
      label: 'Tags',
      isSortable: true,
      isVisible: true
    }
  ],

  filterBuilderProps
};

export const persistState = [
  'comicEditor.sortKey',
  'comicEditor.sortDirection',
  'comicEditor.selectedFilterKey',
  'comicEditor.customFilters',
  'comicEditor.columns'
];

//
// Actions Types

export const SET_COMIC_EDITOR_SORT = 'comicEditor/setComicEditorSort';
export const SET_COMIC_EDITOR_FILTER = 'comicEditor/setComicEditorFilter';
export const SAVE_COMIC_EDITOR = 'comicEditor/saveComicEditor';
export const BULK_DELETE_COMIC = 'comicEditor/bulkDeleteComic';
export const SET_COMIC_EDITOR_TABLE_OPTION = 'comicIndex/setComicEditorTableOption';

//
// Action Creators

export const setComicEditorSort = createAction(SET_COMIC_EDITOR_SORT);
export const setComicEditorFilter = createAction(SET_COMIC_EDITOR_FILTER);
export const saveComicEditor = createThunk(SAVE_COMIC_EDITOR);
export const bulkDeleteComic = createThunk(BULK_DELETE_COMIC);
export const setComicEditorTableOption = createAction(SET_COMIC_EDITOR_TABLE_OPTION);

//
// Action Handlers

export const actionHandlers = handleThunks({
  [SAVE_COMIC_EDITOR]: function(getState, payload, dispatch) {
    dispatch(set({
      section,
      isSaving: true
    }));

    const promise = createAjaxRequest({
      url: '/comic/editor',
      method: 'PUT',
      data: JSON.stringify(payload),
      dataType: 'json'
    }).request;

    promise.done((data) => {
      dispatch(batchActions([
        ...data.map((comic) => {
          return updateItem({
            id: comic.id,
            section: 'comic',
            ...comic
          });
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
  },

  [BULK_DELETE_COMIC]: function(getState, payload, dispatch) {
    dispatch(set({
      section,
      isDeleting: true
    }));

    const promise = createAjaxRequest({
      url: '/comic/editor',
      method: 'DELETE',
      data: JSON.stringify(payload),
      dataType: 'json'
    }).request;

    promise.done(() => {
      // SignaR will take care of removing the comic from the collection

      dispatch(set({
        section,
        isDeleting: false,
        deleteError: null
      }));
    });

    promise.fail((xhr) => {
      dispatch(set({
        section,
        isDeleting: false,
        deleteError: xhr
      }));
    });
  }
});

//
// Reducers

export const reducers = createHandleActions({

  [SET_COMIC_EDITOR_TABLE_OPTION]: createSetTableOptionReducer(section),
  [SET_COMIC_EDITOR_SORT]: createSetClientSideCollectionSortReducer(section),
  [SET_COMIC_EDITOR_FILTER]: createSetClientSideCollectionFilterReducer(section)

}, defaultState, section);
