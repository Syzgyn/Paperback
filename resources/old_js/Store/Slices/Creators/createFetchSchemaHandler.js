import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

function createFetchSchemaHandler(section, url) {
  const thunk = createAsyncThunk(section, async (params) => {
        const response = await axios.get(url);
        return response.data.data;
  });

  thunk.reducers = (builder) => {
    builder.addCase(thunk.pending, (state) => {
        state.isSchemaLoading = true;
    });
    builder.addCase(thunk.fulfilled, (state, action) => {
        state.isSchemaLoading = false;
        state.isSchemaPopulated = true;
        schemaError = null;
        schema = action.payload;
    });
    builder.addCase(thunk.rejected, (state, action) => {
        state.isSchemaLoading = false;
        state.isSchemaPopulated = true;
        state.schemaError = action.error;
    });
  };

  return thunk;
}

export default createFetchSchemaHandler;
