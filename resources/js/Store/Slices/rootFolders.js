import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
};

export const fetchItems = createAsyncThunk(
    "rootFolders/fetchItems",
    async () => {
        const response = await axios.get("/api/rootFolder");
        return response.data.data;
    }
);

export const addItem = createAsyncThunk(
    "rootFolders/addItem",
    async (path, { dispatch }) => {
        const response = await axios.post("/api/rootFolder", { path });
        dispatch(fetchItems());
        return response.data;
    }
);

export const deleteItem = createAsyncThunk(
    "rootFolders/deleteItem",
    async (id, { dispatch }) => {
        const response = await axios.delete("/api/rootFolder/" + id);
        dispatch(fetchItems());
        return response.data;
    }
);

const slice = createSlice({
    name: "rootFolders",
    initialState: defaultState,
    reducers: {},
    extraReducers: {
        [fetchItems.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchItems.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export const rootFoldersSelector = (state) => state.rootFolders;
export default slice.reducer;
