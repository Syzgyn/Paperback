import {
    createSlice,
} from "@reduxjs/toolkit";
import createActions from "@/Store/Slices/Settings/settingsConnectors";

export const {
    defaultState,
    selectSchema,
    deselectSchema,
    fetchSchema,
    fetchItems:fetchIndexers,
    submitItem:submitIndexer,
    testItem:testIndexer,
    submitSettings,
} = createActions("indexer");

export const slice = createSlice({
    name: "indexers",
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
        [submitIndexer.pending]: (state) => {
            state.isSaving = true;
        },
        [submitIndexer.fulfilled]: (state) => {
            state.isSaving = false;
        },
        [submitIndexer.rejected]: (state) => {
            //TODO: Error handling
            state.isSaving = false;
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
