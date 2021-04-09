import moment from 'moment';
import { createAction } from 'redux-actions';
import { sortDirections } from 'Helpers/Props';
import createSetTableOptionReducer from './Creators/Reducers/createSetTableOptionReducer';
import createSetClientSideCollectionSortReducer from './Creators/Reducers/createSetClientSideCollectionSortReducer';
import createSetClientSideCollectionFilterReducer from './Creators/Reducers/createSetClientSideCollectionFilterReducer';
import createHandleActions from './Creators/createHandleActions';
import { filters, filterPredicates, filterBuilderProps, sortPredicates } from './comicActions';

//
// Variables

export const section = 'comicIndex';

//
// State

export const defaultState = {
  sortKey: 'sortTitle',
  sortDirection: sortDirections.ASCENDING,
  secondarySortKey: 'sortTitle',
  secondarySortDirection: sortDirections.ASCENDING,
  view: 'posters',

  posterOptions: {
    detailedProgressBar: false,
    size: 'large',
    showTitle: false,
    showMonitored: true,
    showQualityProfile: true,
    showSearchAction: false
  },

  overviewOptions: {
    detailedProgressBar: false,
    size: 'medium',
    showMonitored: true,
    showNetwork: true,
    showQualityProfile: true,
    showPreviousAiring: false,
    showAdded: false,
    showSeasonCount: true,
    showPath: false,
    showSizeOnDisk: false,
    showSearchAction: false
  },

  tableOptions: {
    showBanners: false,
    showSearchAction: false
  },

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
      name: 'comicType',
      label: 'Type',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'network',
      label: 'Network',
      isSortable: true,
      isVisible: true
    },
    {
      name: 'qualityProfileId',
      label: 'Quality Profile',
      isSortable: true,
      isVisible: true
    },
    {
      name: 'languageProfileId',
      label: 'Language Profile',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'nextAiring',
      label: 'Next Airing',
      isSortable: true,
      isVisible: true
    },
    {
      name: 'previousAiring',
      label: 'Previous Airing',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'added',
      label: 'Added',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'seasonCount',
      label: 'Seasons',
      isSortable: true,
      isVisible: true
    },
    {
      name: 'issueProgress',
      label: 'Issues',
      isSortable: true,
      isVisible: true
    },
    {
      name: 'issueCount',
      label: 'Issue Count',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'latestSeason',
      label: 'Latest Season',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'year',
      label: 'Year',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'path',
      label: 'Path',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'sizeOnDisk',
      label: 'Size on Disk',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'genres',
      label: 'Genres',
      isSortable: false,
      isVisible: false
    },
    {
      name: 'ratings',
      label: 'Rating',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'certification',
      label: 'Certification',
      isSortable: false,
      isVisible: false
    },
    {
      name: 'tags',
      label: 'Tags',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'useSceneNumbering',
      label: 'Scene Numbering',
      isSortable: true,
      isVisible: false
    },
    {
      name: 'actions',
      columnLabel: 'Actions',
      isVisible: true,
      isModifiable: false
    }
  ],

  sortPredicates: {
    ...sortPredicates,

    network: function(item) {
      const network = item.network;

      return network ? network.toLowerCase() : '';
    },

    nextAiring: function(item, direction) {
      const nextAiring = item.nextAiring;

      if (nextAiring) {
        return moment(nextAiring).unix();
      }

      if (direction === sortDirections.DESCENDING) {
        return 0;
      }

      return Number.MAX_VALUE;
    },

    issueProgress: function(item) {
      const { statistics = {} } = item;

      const {
        issueCount = 0,
        issueFileCount
      } = statistics;

      const progress = issueCount ? issueFileCount / issueCount * 100 : 100;

      return progress + issueCount / 1000000;
    },

    issueCount: function(item) {
      const { statistics = {} } = item;

      return statistics.totalIssueCount || 0;
    },

    seasonCount: function(item) {
      const { statistics = {} } = item;

      return statistics.seasonCount;
    },

    ratings: function(item) {
      const { ratings = {} } = item;

      return ratings.value;
    }
  },

  selectedFilterKey: 'all',

  filters,

  filterPredicates,

  filterBuilderProps
};

export const persistState = [
  'comicIndex.sortKey',
  'comicIndex.sortDirection',
  'comicIndex.selectedFilterKey',
  'comicIndex.customFilters',
  'comicIndex.view',
  'comicIndex.columns',
  'comicIndex.posterOptions',
  'comicIndex.overviewOptions',
  'comicIndex.tableOptions'
];

//
// Actions Types

export const SET_COMIC_SORT = 'comicIndex/setComicSort';
export const SET_COMIC_FILTER = 'comicIndex/setComicFilter';
export const SET_COMIC_VIEW = 'comicIndex/setComicView';
export const SET_COMIC_TABLE_OPTION = 'comicIndex/setComicTableOption';
export const SET_COMIC_POSTER_OPTION = 'comicIndex/setComicPosterOption';
export const SET_COMIC_OVERVIEW_OPTION = 'comicIndex/setComicOverviewOption';

//
// Action Creators

export const setComicSort = createAction(SET_COMIC_SORT);
export const setComicFilter = createAction(SET_COMIC_FILTER);
export const setComicView = createAction(SET_COMIC_VIEW);
export const setComicTableOption = createAction(SET_COMIC_TABLE_OPTION);
export const setComicPosterOption = createAction(SET_COMIC_POSTER_OPTION);
export const setComicOverviewOption = createAction(SET_COMIC_OVERVIEW_OPTION);

//
// Reducers

export const reducers = createHandleActions({

  [SET_COMIC_SORT]: createSetClientSideCollectionSortReducer(section),
  [SET_COMIC_FILTER]: createSetClientSideCollectionFilterReducer(section),

  [SET_COMIC_VIEW]: function(state, { payload }) {
    return Object.assign({}, state, { view: payload.view });
  },

  [SET_COMIC_TABLE_OPTION]: createSetTableOptionReducer(section),

  [SET_COMIC_POSTER_OPTION]: function(state, { payload }) {
    const posterOptions = state.posterOptions;

    return {
      ...state,
      posterOptions: {
        ...posterOptions,
        ...payload
      }
    };
  },

  [SET_COMIC_OVERVIEW_OPTION]: function(state, { payload }) {
    const overviewOptions = state.overviewOptions;

    return {
      ...state,
      overviewOptions: {
        ...overviewOptions,
        ...payload
      }
    };
  }

}, defaultState, section);
