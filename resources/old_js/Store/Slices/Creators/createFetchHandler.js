import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export default function createFetchHandler(section, url) {
    const thunk = createAsyncThunk(section, async (param) => {
        url = param == null ? url : `${url}/${param}`;
        const response = await axios.get(url);
        return response.data.data;
    });

    thunk.reducers = (builder) => {
        builder.addCase(thunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(thunk.fulfilled, (state) => {
            state.isLoading = false;
            state.isPopulated = true;
        });
        builder.addCase(thunk.rejected, (state, action) => {
            state.isLoading = false;
            state.isPopulated = false;
            error: action.error;
        });
    }

    return thunk;
}
