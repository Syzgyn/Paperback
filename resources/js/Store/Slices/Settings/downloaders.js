import {
    createSlice,
} from "@reduxjs/toolkit";
import createActions from "@/Store/Slices/Settings/settingsConnectors";

export const {
    defaultState,
    selectSchema,
    deselectSchema,
    fetchSchema,
    fetchItems:fetchDownloaders,
    submitItem:submitDownloader,
    testItem:testDownloader,
    submitSettings,
} = createActions("downloader");

export const slice = createSlice({
    name: "downloaders",
    initialState: defaultState,
    reducers: {
        removeDownloaders() {
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
        [fetchDownloaders.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchDownloaders.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchDownloaders.rejected]: (state) => {
            state.isLoading = false;
        },
        [submitDownloader.pending]: (state) => {
            state.isSaving = true;
        },
        [submitDownloader.fulfilled]: (state) => {
            state.isSaving = false;
        },
        [submitDownloader.rejected]: (state) => {
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
        [testDownloader.pending]: (state) => {
            state.isTesting = true;
        },
        [testDownloader.fulfilled]: (state) => {
            state.isTesting = false;
        },
        [testDownloader.rejected]: (state) => {
            state.isTesting = false;
        },
    },
});

export const settingsDownloadersSelector = (state) => state.settings.downloaders;
export const { removeDownloaders } = slice.actions;

export default slice.reducer;
