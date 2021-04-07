import {
    createAction,
    createAsyncThunk,
    createSlice,
    current,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { batch } from "react-redux";
import { createSelector } from "reselect";
import createFetchHandler from "@/Store/Slices/Creators/createFetchHandler";
import createRemoveItemHandler from "@/Store/Slices/Creators/createRemoveItemHandler";

import createSetSettingValueReducer from '@/Store/Slices/Creators/Reducers/createSetSettingValueReducer';
import createSetProviderFieldValueReducer from '@/Store/Slices/Creators/Reducers/createSetProviderFieldValueReducer';
import createFetchSchemaHandler from '@/Store/Slices/Creators/createFetchSchemaHandler';
import createSaveProviderHandler, { createCancelSaveProviderHandler } from '@/Store/Slices/Creators/createSaveProviderHandler';
import createTestProviderHandler, { createCancelTestProviderHandler } from '@/Store/Slices/Creators/createTestProviderHandler';
import createTestAllProvidersHandler from '@/Store/Slices/Creators/createTestAllProvidersHandler';

const defaultState = {
    isFetching: false,
    isPopulated: false,
    error: null,
    isSchemaFetching: false,
    isSchemaPopulated: false,
    schemaError: null,
    schema: [],
    selectedSchema: {},
    isSaving: false,
    saveError: null,
    isTesting: false,
    isTestingAll: false,
    items: [],
    pendingChanges: {},
};

export const fetchIndexers = createFetchHandler('settings/indexers/fetchIndexers', '/api/settings/indexers');
export const fetchIndexerSchema = createAction('settings/indexers/fetchIndexerSchema');
export const selectIndexerSchema = createAction('settings/indexers/selectIndexerSchema');
export const cloneIndexer = createAction('settings/indexers/cloneIndexer');
export const setIndexerValue = createAction('settings/indexers/setIndexerValue');
export const setIndexerFieldValue = createAction('settings/indexers/setIndexerFieldValue');
export const saveIndexer = createAction('settings/indexers/saveIndexer');
export const cancelSaveIndexer = createAction('settings/indexers/cancelSaveIndexer');
export const deleteIndexer = createRemoveItemHandler('settings/indexers/deleteIndexer', '/api/settings/indexers');
export const testIndexer = createAction('settings/indexers/testIndexer');
export const cancelTestIndexer = createAction('settings/indexers/cancelTestIndexer');
export const testAllIndexers = createAction('settings/indexers/testAllIndexers');
