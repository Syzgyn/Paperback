import $ from 'jquery';
import _ from 'lodash';
//import { batchActions } from 'redux-batched-actions';
import createAjaxRequest from '@/Utilities/createAjaxRequest';
import getProviderState from '@/Utilities/State/getProviderState';
//import { set, updateItem } from '../baseActions';
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const abortCurrentRequests = {};
let lastSaveData = null;

export function createCancelSaveProviderHandler(section) {
  return function(getState, payload, dispatch) {
    if (abortCurrentRequests[section]) {
      abortCurrentRequests[section]();
      abortCurrentRequests[section] = null;
    }
  };
}

function createSaveProviderHandler(section, url) {
    const thunk = createAsyncThunk(section, async (payload, { getState }) => {
        const {
          id,
          queryParams = {},
          ...otherPayload
        } = payload;
        
        const requestUrl = id ? `${url}/${id}` : url;
        const method = id ? 'PUT' : 'POST';
        const saveData = getProviderState({ id, ...otherPayload }, getState, section);
        const response = await axios[method](url, JSON.stringify(saveData));
        return response.data.data;
    });

    thunk.reducers = (builder) => {
        builder.addCase(thunk.pending, (state) => {
            state.isSaving = true;
        });
        builder.addCase(thunk.fulfilled, (state) => {
            state.isSaving = false;
            state.saveError = null;
            state.pendingChanges = {};
        });
        buildere.addCase(thunk.rejected, (state, action) => {
            state.isSaving = false;
            state.saveError = action.meta.aborted ? null : action.error;
        });
    }

    return thunk;
}

export default createSaveProviderHandler;
