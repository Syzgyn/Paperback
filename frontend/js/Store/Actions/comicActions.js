import _ from 'lodash';
import { createAction } from 'redux-actions';
import { batchActions } from 'redux-batched-actions';
import createAjaxRequest from 'Utilities/createAjaxRequest';
import sortByName from 'Utilities/Array/sortByName';
import dateFilterPredicate from 'Utilities/Date/dateFilterPredicate';
import { filterBuilderTypes, filterBuilderValueTypes, filterTypePredicates, filterTypes, sortDirections } from 'Helpers/Props';
import { createThunk, handleThunks } from 'Store/thunks';
import createSetSettingValueReducer from './Creators/Reducers/createSetSettingValueReducer';
import createFetchHandler from './Creators/createFetchHandler';
import createSaveProviderHandler from './Creators/createSaveProviderHandler';
import createRemoveItemHandler from './Creators/createRemoveItemHandler';
import createHandleActions from './Creators/createHandleActions';
import { updateItem, set } from './baseActions';
import { fetchEpisodes } from './episodeActions';

//
// Local

const MONITOR_TIMEOUT = 1000;
const seasonsToUpdate = {};
const seasonMonitorToggleTimeouts = {};

//
// Variables

export const section = 'comic';

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
    label: 'Missing Episodes',
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

  seasonCount: function(item, filterValue, type) {
    const predicate = filterTypePredicates[type];
    const seasonCount = item.statistics ? item.statistics.seasonCount : 0;

    return predicate(seasonCount, filterValue);
  },

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
    valueType: filterBuilderValueTypes.COMIC_STATUS
  },
  {
    name: 'comicType',
    label: 'Type',
    type: filterBuilderTypes.EXACT,
    valueType: filterBuilderValueTypes.COMIC_TYPES
  },
  {
    name: 'network',
    label: 'Network',
    type: filterBuilderTypes.STRING,
    optionsSelector: function(items) {
      const tagList = items.reduce((acc, comic) => {
        if (comic.network) {
          acc.push({
            id: comic.network,
            name: comic.network
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
      const tagList = items.reduce((acc, comic) => {
        comic.genres.forEach((genre) => {
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

//
// State

export const defaultState = {
  isFetching: false,
  isPopulated: false,
  error: null,
  isSaving: false,
  saveError: null,
  items: [],
  sortKey: 'sortTitle',
  sortDirection: sortDirections.ASCENDING,
  pendingChanges: {}
};

//
// Actions Types

export const FETCH_COMIC = 'comic/fetchComic';
export const SET_COMIC_VALUE = 'comic/setComicValue';
export const SAVE_COMIC = 'comic/saveComic';
export const DELETE_COMIC = 'comic/deleteComic';

export const TOGGLE_COMIC_MONITORED = 'comic/toggleComicMonitored';
export const TOGGLE_SEASON_MONITORED = 'comic/toggleSeasonMonitored';
export const UPDATE_COMIC_MONITOR = 'comic/updateComicMonitor';

//
// Action Creators

export const fetchComic = createThunk(FETCH_COMIC);
export const saveComic = createThunk(SAVE_COMIC, (payload) => {
  const newPayload = {
    ...payload
  };

  if (payload.moveFiles) {
    newPayload.queryParams = {
      moveFiles: true
    };
  }

  delete newPayload.moveFiles;

  return newPayload;
});

export const deleteComic = createThunk(DELETE_COMIC, (payload) => {
  return {
    ...payload,
    queryParams: {
      deleteFiles: payload.deleteFiles,
      addImportListExclusion: payload.addImportListExclusion
    }
  };
});

export const toggleComicMonitored = createThunk(TOGGLE_COMIC_MONITORED);
export const toggleSeasonMonitored = createThunk(TOGGLE_SEASON_MONITORED);
export const updateComicMonitor = createThunk(UPDATE_COMIC_MONITOR);

export const setComicValue = createAction(SET_COMIC_VALUE, (payload) => {
  return {
    section,
    ...payload
  };
});

//
// Helpers

function getSaveAjaxOptions({ ajaxOptions, payload }) {
  if (payload.moveFolder) {
    ajaxOptions.url = `${ajaxOptions.url}?moveFolder=true`;
  }

  return ajaxOptions;
}

//
// Action Handlers

export const actionHandlers = handleThunks({

  [FETCH_COMIC]: createFetchHandler(section, '/comic'),
  [SAVE_COMIC]: createSaveProviderHandler(section, '/comic', { getAjaxOptions: getSaveAjaxOptions }),
  [DELETE_COMIC]: createRemoveItemHandler(section, '/comic'),

  [TOGGLE_COMIC_MONITORED]: (getState, payload, dispatch) => {
    const {
      comicId: id,
      monitored
    } = payload;

    const comic = _.find(getState().comic.items, { id });

    dispatch(updateItem({
      id,
      section,
      isSaving: true
    }));

    const promise = createAjaxRequest({
      url: `/comic/${id}`,
      method: 'PUT',
      data: JSON.stringify({
        ...comic,
        monitored
      }),
      dataType: 'json'
    }).request;

    promise.done((data) => {
      dispatch(updateItem({
        id,
        section,
        isSaving: false,
        monitored
      }));
    });

    promise.fail((xhr) => {
      dispatch(updateItem({
        id,
        section,
        isSaving: false
      }));
    });
  },

  [TOGGLE_SEASON_MONITORED]: function(getState, payload, dispatch) {
    const {
      comicId: id,
      seasonNumber,
      monitored
    } = payload;

    const seasonMonitorToggleTimeout = seasonMonitorToggleTimeouts[id];

    if (seasonMonitorToggleTimeout) {
      clearTimeout(seasonMonitorToggleTimeout);
      delete seasonMonitorToggleTimeouts[id];
    }

    const comic = getState().comic.items.find((s) => s.id === id);
    const seasons = _.cloneDeep(comic.seasons);
    const season = seasons.find((s) => s.seasonNumber === seasonNumber);

    season.isSaving = true;

    dispatch(updateItem({
      id,
      section,
      seasons
    }));

    seasonsToUpdate[seasonNumber] = monitored;
    season.monitored = monitored;

    seasonMonitorToggleTimeouts[id] = setTimeout(() => {
      createAjaxRequest({
        url: `/comic/${id}`,
        method: 'PUT',
        data: JSON.stringify({
          ...comic,
          seasons
        }),
        dataType: 'json'
      }).request.then(
        (data) => {
          const changedSeasons = [];

          data.seasons.forEach((s) => {
            if (seasonsToUpdate.hasOwnProperty(s.seasonNumber)) {
              if (s.monitored === seasonsToUpdate[s.seasonNumber]) {
                changedSeasons.push(s);
              } else {
                s.isSaving = true;
              }
            }
          });

          const episodesToUpdate = getState().episodes.items.reduce((acc, episode) => {
            if (episode.comicId !== data.id) {
              return acc;
            }

            const changedSeason = changedSeasons.find((s) => s.seasonNumber === episode.seasonNumber);

            if (!changedSeason) {
              return acc;
            }

            acc.push(updateItem({
              id: episode.id,
              section: 'episodes',
              monitored: changedSeason.monitored
            }));

            return acc;
          }, []);

          dispatch(batchActions([
            updateItem({
              id,
              section,
              ...data
            }),

            ...episodesToUpdate
          ]));

          changedSeasons.forEach((s) => {
            delete seasonsToUpdate[s.seasonNumber];
          });
        },
        (xhr) => {
          dispatch(updateItem({
            id,
            section,
            seasons: comic.seasons
          }));

          Object.keys(seasonsToUpdate).forEach((s) => {
            delete seasonsToUpdate[s];
          });
        });
    }, MONITOR_TIMEOUT);
  },

  [UPDATE_COMIC_MONITOR]: function(getState, payload, dispatch) {
    const {
      id,
      monitor
    } = payload;

    const comicToUpdate = { id };

    if (monitor !== 'None') {
      comicToUpdate.monitored = true;
    }

    dispatch(set({
      section,
      isSaving: true
    }));

    const promise = createAjaxRequest({
      url: '/seasonPass',
      method: 'POST',
      data: JSON.stringify({
        comic: [
          comicToUpdate
        ],
        monitoringOptions: { monitor }
      }),
      dataType: 'json'
    }).request;
    promise.done((data) => {
      dispatch(fetchEpisodes({ comicId: id }));

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

  [SET_COMIC_VALUE]: createSetSettingValueReducer(section)

}, defaultState, section);
