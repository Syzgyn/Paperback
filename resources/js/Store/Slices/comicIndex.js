import {
    createAction,
    createAsyncThunk,
    createSlice,
    createSelector,
    current,
} from "@reduxjs/toolkit";
import _ from "lodash";
import moment from 'moment';
import { sortDirections } from '@/Helpers/Props';
//import createSetTableOptionReducer from './Creators/Reducers/createSetTableOptionReducer';
//import createSetClientSideCollectionSortReducer from './Creators/Reducers/createSetClientSideCollectionSortReducer';
//import createSetClientSideCollectionFilterReducer from './Creators/Reducers/createSetClientSideCollectionFilterReducer';
//import createHandleActions from './Creators/createHandleActions';
import { filters, filterPredicates, filterBuilderProps, sortPredicates } from '@/Store/Slices/comics';

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
      label: 'Series Title',
      isSortable: true,
      isVisible: true,
      isModifiable: false
    },
    {
      name: 'seriesType',
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
      name: 'episodeProgress',
      label: 'Episodes',
      isSortable: true,
      isVisible: true
    },
    {
      name: 'episodeCount',
      label: 'Episode Count',
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

    episodeProgress: function(item) {
      const { statistics = {} } = item;

      const {
        episodeCount = 0,
        episodeFileCount
      } = statistics;

      const progress = episodeCount ? episodeFileCount / episodeCount * 100 : 100;

      return progress + episodeCount / 1000000;
    },

    episodeCount: function(item) {
      const { statistics = {} } = item;

      return statistics.totalEpisodeCount || 0;
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
// Action Creators

export const setComicSort = createAction("comicIndex/setComicSort");
export const setComicFilter = createAction("comicIndex/setComicFilter");
export const setComicView = createAction("comicIndex/setComicView");
export const setComicTableOption = createAction("comicIndex/setComicTableOption");
export const setComicPosterOption = createAction("comicIndex/setComicPosterOption");
export const setComicOverviewOption = createAction("comicIndex/setComicOverviewOption");

const whitelistedProperties = [
    'pageSize',
    'columns',
    'tableOptions'
];

//
// Reducers
const slice = createSlice({
    name: "comicIndex",
    initialState: defaultState,
    reducers: {
        setComicSort: (state, {payload}) => {
			const sortKey = payload.sortKey || state.sortKey;
			let sortDirection = payload.sortDirection;

			if (!sortDirection) {
			  if (payload.sortKey === state.sortKey) {
				sortDirection = state.sortDirection === sortDirections.ASCENDING ?
				  sortDirections.DESCENDING :
				  sortDirections.ASCENDING;
			  } else {
				sortDirection = state.sortDirection;
			  }
			}

			state.sortKey = sortKey;
			state.sortDirection = sortDirection;
        },
        setComicFilter: (state, {payload}) => {
            state.selectedFilterKey = payload.selectedFilterKey;
        },
        setComicView: (state, {payload}) => {
            state.view = payload.view;
		},
        setComicTableOption: (state, {payload}) => {
            state.tableOptions = Object.assign({},
                ...state.tableOptions,
                _.pick(payload, whitelistedProperties)
            );
        },
        setComicPosterOption: (state, {payload}) => {
            state.posterOptions = {
                ...state.posterOptions,
                payload
            }
        },
        setComicOverviewOption: (state, {payload}) => {
            state.overviewOptions = {
                ...state.overviewOptions,
                payload
            }
        },
    }
});

export default slice.reducer;
