import {
    createAction,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
    isSchemaLoading: false,
    isSchemaPopulated: false,
    schema: [],
    selectedSchema: null,
    isTesting: false,
};

export const selectSchema = createAction("settings/indexers/selectSchema");
export const deselectSchema = createAction("settings/indexers/deselectSchema");

export const fetchIndexers = createAsyncThunk(
    "settings/indexers/fetchIndexers",
    async () => {
        const response = await axios.get("/api/indexer");
        return response.data.data;
    }
);

export const submitIndexer = createAsyncThunk(
    "settings/indexers/submitIndexer",
    async (values, {dispatch}) => {
        let response = null;
        if (values.id) {
            response = await axios.put("/api/indexer/" + values.id, {values})
        } else {
            response = await axios.post("/api/indexer", {values})
        }

        if (response.data.data) {
            dispatch(fetchIndexers());
        }
    }
);

export const submitSettings = createAsyncThunk(
    "settings/indexers/submitSettings",
    async (values) => {
        const response = await axios.post("/api/settings", { indexers: values });
        if (response.data === 1) {
            toast.dark("Settings Saved");
        } else {
            //TODO: More refined error handling
            toast.dark("Error saving settings");
        }
    }
);

export const fetchSchema = createAsyncThunk(
    "settings/indexers/fetchSchema",
    async () => {
        const response = await axios.get("/api/indexer/schema");
        return response.data;
    }
);

export const testIndexer = createAsyncThunk(
    "settings/indexers/testIndexer",
    async (values) => {
        const response = await axios.post("/api/indexer/test", {values});
        return response.data;
    }
);

export const slice = createSlice({
    name: "general",
    initialState: defaultState,
    reducers: {
        removeIndexers() {
            return defaultState;
        },
    },
    extraReducers: {
        [selectSchema]: (state, action) => {
            state.selectedSchema = action.payload;
        },
        [deselectSchema]: (state) => {
            state.selectedSchema = null;
        },
        [fetchIndexers.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchIndexers.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchIndexers.rejected]: (state) => {
            state.isLoading = false;
        },
        [submitIndexer.rejected]: (state) => {
            //TODO: Error handling
            state.isLoading = false;
        },
        [fetchSchema.pending]: (state) => {
            state.isSchemaLoading = true;
        },
        [fetchSchema.fulfilled]: (state, action) => {
            state.schema = action.payload;
            state.isSchemaPopulated = true;
            state.isSchemaLoading = false;
        },
        [fetchSchema.rejected]: (state) => {
            state.isSchemaLoading = false;
        },
        [testIndexer.pending]: (state) => {
            state.isTesting = true;
        },
        [testIndexer.fulfilled]: (state) => {
            state.isTesting = false;
        },
        [testIndexer.rejected]: (state) => {
            state.isTesting = false;
        },
    },
});

export const settingsIndexersSelector = (state) => state.settings.indexers;
export const { removeIndexers } = slice.actions;

export default slice.reducer;
