import {
    createAction,
    createAsyncThunk,
    createSlice,
    createSelector,
    current,
} from "@reduxjs/toolkit";
import { getCurrentCvidSelector } from "@/Store/Slices/router";
import { filterBuilderTypes, filterBuilderValueTypes, filterTypePredicates, filterTypes, sortDirections } from '@/Helpers/Props';

import axios from "axios";
import { push } from "connected-react-router";
import { batch } from "react-redux";
import { toast } from "react-toastify";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    error: null,
    isSaving: false,
    saveError: null,
    items: [],
    sortKey: "sortName",
    sortDir: sortDirections.ASCENDING,
    pendingChanges: {},
};

export const filters = [
  {
    key: 'all',
    label: 'All',
    filters: []
  },
  {
    key: 'monitored',
    label: 'Monitored Only',
    filters: [
      {
        key: 'monitored',
        value: true,
        type: filterTypes.EQUAL
      }
    ]
  },
  {
    key: 'unmonitored',
    label: 'Unmonitored Only',
    filters: [
      {
        key: 'monitored',
        value: false,
        type: filterTypes.EQUAL
      }
    ]
  },
  {
    key: 'continuing',
    label: 'Continuing Only',
    filters: [
      {
        key: 'status',
        value: 'continuing',
        type: filterTypes.EQUAL
      }
    ]
  },
  {
    key: 'ended',
    label: 'Ended Only',
    filters: [
      {
        key: 'status',
        value: 'ended',
        type: filterTypes.EQUAL
      }
    ]
  },
  {
    key: 'missing',
    label: 'Missing Issues',
    filters: [
      {
        key: 'missing',
        value: true,
        type: filterTypes.EQUAL
      }
    ]
  }
];

export const filterPredicates = {
  episodeProgress: function(item, filterValue, type) {
    const { statistics = {} } = item;

    const {
      episodeCount = 0,
      episodeFileCount
    } = statistics;

    const progress = episodeCount ?
      episodeFileCount / episodeCount * 100 :
      100;

    const predicate = filterTypePredicates[type];

    return predicate(progress, filterValue);
  },

  missing: function(item) {
    const { statistics = {} } = item;

    return statistics.episodeCount - statistics.episodeFileCount > 0;
  },

  nextAiring: function(item, filterValue, type) {
    return dateFilterPredicate(item.nextAiring, filterValue, type);
  },

  previousAiring: function(item, filterValue, type) {
    return dateFilterPredicate(item.previousAiring, filterValue, type);
  },

  added: function(item, filterValue, type) {
    return dateFilterPredicate(item.added, filterValue, type);
  },

  ratings: function(item, filterValue, type) {
    const predicate = filterTypePredicates[type];

    return predicate(item.ratings.value * 10, filterValue);
  },

/*
  seasonCount: function(item, filterValue, type) {
    const predicate = filterTypePredicates[type];
    const seasonCount = item.statistics ? item.statistics.seasonCount : 0;

    return predicate(seasonCount, filterValue);
  },
*/

  sizeOnDisk: function(item, filterValue, type) {
    const predicate = filterTypePredicates[type];
    const sizeOnDisk = item.statistics && item.statistics.sizeOnDisk ?
      item.statistics.sizeOnDisk :
      0;

    return predicate(sizeOnDisk, filterValue);
  }
};

export const filterBuilderProps = [
  {
    name: 'monitored',
    label: 'Monitored',
    type: filterBuilderTypes.EXACT,
    valueType: filterBuilderValueTypes.BOOL
  },
  {
    name: 'status',
    label: 'Status',
    type: filterBuilderTypes.EXACT,
    valueType: filterBuilderValueTypes.SERIES_STATUS
  },
  {
    name: 'seriesType',
    label: 'Type',
    type: filterBuilderTypes.EXACT,
    valueType: filterBuilderValueTypes.SERIES_TYPES
  },
  {
    name: 'network',
    label: 'Network',
    type: filterBuilderTypes.STRING,
    optionsSelector: function(items) {
      const tagList = items.reduce((acc, series) => {
        if (series.network) {
          acc.push({
            id: series.network,
            name: series.network
          });
        }

        return acc;
      }, []);

      return tagList.sort(sortByName);
    }
  },
  {
    name: 'qualityProfileId',
    label: 'Quality Profile',
    type: filterBuilderTypes.EXACT,
    valueType: filterBuilderValueTypes.QUALITY_PROFILE
  },
  {
    name: 'languageProfileId',
    label: 'Language Profile',
    type: filterBuilderTypes.EXACT,
    valueType: filterBuilderValueTypes.LANGUAGE_PROFILE
  },
  {
    name: 'nextAiring',
    label: 'Next Airing',
    type: filterBuilderTypes.DATE,
    valueType: filterBuilderValueTypes.DATE
  },
  {
    name: 'previousAiring',
    label: 'Previous Airing',
    type: filterBuilderTypes.DATE,
    valueType: filterBuilderValueTypes.DATE
  },
  {
    name: 'added',
    label: 'Added',
    type: filterBuilderTypes.DATE,
    valueType: filterBuilderValueTypes.DATE
  },
  {
    name: 'seasonCount',
    label: 'Season Count',
    type: filterBuilderTypes.NUMBER
  },
  {
    name: 'episodeProgress',
    label: 'Episode Progress',
    type: filterBuilderTypes.NUMBER
  },
  {
    name: 'path',
    label: 'Path',
    type: filterBuilderTypes.STRING
  },
  {
    name: 'rootFolderPath',
    label: 'Root Folder Path',
    type: filterBuilderTypes.EXACT
  },
  {
    name: 'sizeOnDisk',
    label: 'Size on Disk',
    type: filterBuilderTypes.NUMBER,
    valueType: filterBuilderValueTypes.BYTES
  },
  {
    name: 'genres',
    label: 'Genres',
    type: filterBuilderTypes.ARRAY,
    optionsSelector: function(items) {
      const tagList = items.reduce((acc, series) => {
        series.genres.forEach((genre) => {
          acc.push({
            id: genre,
            name: genre
          });
        });

        return acc;
      }, []);

      return tagList.sort(sortByName);
    }
  },
  {
    name: 'ratings',
    label: 'Rating',
    type: filterBuilderTypes.NUMBER
  },
  {
    name: 'certification',
    label: 'Certification',
    type: filterBuilderTypes.EXACT
  },
  {
    name: 'tags',
    label: 'Tags',
    type: filterBuilderTypes.ARRAY,
    valueType: filterBuilderValueTypes.TAG
  },
  {
    name: 'useSceneNumbering',
    label: 'Scene Numbering',
    type: filterBuilderTypes.EXACT
  }
];

export const sortPredicates = {
  status: function(item) {
    let result = 0;

    if (item.monitored) {
      result += 2;
    }

    if (item.status === 'continuing') {
      result++;
    }

    return result;
  },

  sizeOnDisk: function(item) {
    const { statistics = {} } = item;

    return statistics.sizeOnDisk || 0;
  }
};
export const fetchComics = createAsyncThunk("comics/fetchComics", async () => {
    const response = await axios.get("/api/comic");
    return response.data.data;
});

export const deleteComic = createAsyncThunk(
    "comics/deleteComic",
    async (cvid, { dispatch }) => {
        const response = await axios.delete("/api/comic/" + cvid);
        if (response.data.status == "OK") {
            toast("Comic Deleted");
            batch(() => {
                dispatch(push("/"));
                dispatch(fetchComics());
            });
        }
    },
    {
        condition: () => {
            return confirm("Delete Comic?");
        },
    }
);

export const searchComic = createAsyncThunk(
    "comics/searchComic",
    async (cvid, { getState }) => {
        const state = getState();
        const comic = state.comics.items.find((comic) => comic.cvid == cvid);
        
        if (! comic.monitored) {
            toast("Comic is not monitored");
            return;
        }

        toast("Searching for monitored issues");

        const response = await axios.get("/api/comic/" + cvid + "/download");
    }
);

export const toggleComicMonitored = createAction("comics/toggleComicMonitored");
export const setComicSort = createAction("comics/setComicSort");
export const setComicView = createAction("comics/setComicView");
export const clearPendingChanges = createAction("comics/clearPendingChanges");

const slice = createSlice({
    name: "comics",
    initialState: defaultState,
    reducers: {
        clearPendingChanges: (state) => state.pendingChanges = {},
    },
    extraReducers: {
        [toggleComicMonitored]: (state, { payload }) => {
            console.log("inside");
            const { cvid, monitored } = payload;

            const index = state.items.findIndex((item) => item.cvid == cvid);
            state.items[index].monitored = monitored;
        },
        [fetchComics.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchComics.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchComics.rejected]: (state) => {
            state.isLoading = false;
        },
        [deleteComic.rejected]: () => {
            //TODO: Error handling
        },
        [setComicSort]: (state, action) => {
            const currentState = current(state);
            const oldKey = currentState.sortKey;
            const oldDir = currentState.sortDir;
            const newDir = oldDir == "asc" ? "desc" : "asc";

            if (oldKey === action.payload) {
                state.sortDir = newDir;
            } else {
                state.sortKey = action.payload;
                if (state.sortKey == 'sortName') {
                    state.sortDir = "asc";
                } else {
                    state.sortDir = "desc";
                }
            }
        },
        [setComicView]: (state, action) => {
            state.view = action.payload;
        },
    },
});

export const comicsSelector = (state) => state.comics;
export const currentComicSelector = createSelector(
    [comicsSelector, getCurrentCvidSelector],
    (comics, cvid) => comics.items.find((comic) => comic.cvid == cvid)
);

const comicsSortSelector = (state) => {
    return { key: state.comics.sortKey, dir: state.comics.sortDir };
};
export const sortedComicsSelector = createSelector(
    [comicsSelector, comicsSortSelector],
    (comics, sort) => {
        let clone = Object.assign({}, comics);
        let items = clone.items.slice().sort(function (a, b) {
            if (sort.dir == "asc") {
                return a[sort.key] > b[sort.key] ? 1 : -1;
            } else {
                return a[sort.key] < b[sort.key] ? 1 : -1;
            }
        });

        clone.items = items;

        return clone;
    }
);

export default slice.reducer;
