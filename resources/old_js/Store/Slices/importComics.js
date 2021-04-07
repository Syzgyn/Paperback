import {
    createAsyncThunk,
    createSlice,
    createSelector,
    current,
} from "@reduxjs/toolkit";
import axios from "axios";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
};

export const fetchItems = createAsyncThunk(
    "importComics/fetchItems",
    async (folderId) => {
        const response = await axios.get(
            "/api/rootFolder/" + folderId + "/getFolders"
        );
        return response.data;
    }
);

export const fetchSearchResults = createAsyncThunk(
    "importComics/fetchSearchResults",
    async (index, { getState }) => {
        const state = getState();
        const folderName = state.importComics.items[index].name;
        const response = await axios.get("/api/comic/importSearch", {
            params: { query: folderName },
        });
        return response.data.data;
    }
);

export const importSelectedDirs = createAsyncThunk(
    "importComics/importSelectedDirs",
    async (args, { getState, dispatch }) => {
        const state = getState();
        const data = state.importComics.items
            .filter((item) => item.checked)
            .map((item) => {
                return {
                    path: item.path,
                    monitor: item.monitor,
                    matchId: item.matchId,
                };
            });
        await axios.post("/api/rootFolder/import", { data });
        dispatch(removeCheckedItems());
    }
);

const slice = createSlice({
    name: "importComics",
    initialState: defaultState,
    reducers: {
        clearImportComics() {
            return defaultState;
        },
        toggleCheckbox(state, action) {
            state.items[action.payload].checked = !state.items[action.payload]
                .checked;
        },
        setAllChecked(state, action) {
            for (const item of state.items) {
                item.checked = action.payload;
            }
        },
        setMonitored(state, action) {
            state.items[action.payload.id].monitored = action.payload.monitored;
        },
        setMatchId(state, action) {
            state.items[action.payload.id].matchId = action.payload.matchId;
        },
        removeCheckedItems(state) {
            const currentState = current(state);
            state.items = currentState.items.filter((item) => !item.checked);
        },
    },
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
        [fetchSearchResults.pending]: (state, action) => {
            state.items[action.meta.arg].isLoading = true;
        },
        [fetchSearchResults.fulfilled]: (state, action) => {
            state.items[action.meta.arg].items = action.payload;
            state.items[action.meta.arg].isPopulated = true;
            state.items[action.meta.arg].isLoading = false;

            if (action.payload.length > 0) {
                state.items[action.meta.arg].checked = true;
                state.items[action.meta.arg].matchId = action.payload[0].cvid;
            }
        },
        [fetchSearchResults.rejected]: (state, action) => {
            state.items[action.meta.arg].isLoading = false;
        },
    },
});

export const importComicsSelector = (state) => state.importComics;
export const importComicsCheckedCountSelector = (state) =>
    state.importComics.items.filter((item) => item.checked).length;
export const importComicsItemSelectorFactory = (key) => {
    return createSelector(
        [(state) => state.importComics.items],
        (items) => items[key]
    );
};

export const {
    clearImportComics,
    toggleCheckbox,
    setAllChecked,
    setMonitored,
    setMatchId,
    removeCheckedItems,
} = slice.actions;
export default slice.reducer;
