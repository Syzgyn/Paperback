import {
    createAction,
    createAsyncThunk,
    createSlice,
    current,
} from "@reduxjs/toolkit";
import axios from "axios";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
    page: 1,
    sortKey: "comic.name",
    sortDir: "asc",
    pageSize: 20,
    totalItems: 0,
    totalPages: 0,
    selectedItems: [],
};

const internalSetPage = createAction("wanted/setPage");
const internalSetSortDir = createAction("wanted/setSortDir");
const internalSetSortKey = createAction("wanted/setSortKey");

export const selectItem = createAction("wanted/selectItem");

export const setPage = (page) => {
    return (dispatch) => {
        dispatch(internalSetPage(page));
        dispatch(fetchItems());
    };
};

export const setSortKey = (key) => {
    return (dispatch, getState) => {
        const state = getState();
        const oldKey = state.wanted.sortKey;
        const oldDir = state.wanted.sortDir;
        const newDir = oldDir == "asc" ? "desc" : "asc";

        if (oldKey === key) {
            dispatch(internalSetSortDir(newDir));
        } else {
            dispatch(internalSetSortDir("asc"));
            dispatch(internalSetSortKey(key));
        }

        dispatch(fetchItems());
    };
};

export const fetchItems = createAsyncThunk(
    "wanted/fetchWantedIssues",
    async (vars, { getState }) => {
        const { page, pageSize, sortKey, sortDir } = getState().wanted;
        const response = await axios.get("/api/issue/wanted", {
            params: { page, pageSize, sortKey, sortDir },
        });
        return response.data;
    }
);

const slice = createSlice({
    name: "wanted",
    initialState: defaultState,
    reducers: {
        removeItems(state) {
            state.items = [];
            state.isPopulated = false;
        },
    },
    extraReducers: {
        [selectItem]: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.selectedItems = action.payload;
            } else {
                const currentState = current(state);
                const index = currentState.selectedItems.indexOf(
                    action.payload
                );
                if (index > -1) {
                    state.selectedItems.splice(index, 1);
                } else {
                    state.selectedItems.push(action.payload);
                }
            }
        },
        [internalSetPage]: (state, action) => {
            state.page = action.payload;
            state.selectedItems = [];
        },
        [internalSetSortKey]: (state, action) => {
            state.sortKey = action.payload;
            state.selectedItems = [];
        },
        [internalSetSortDir]: (state, action) => {
            state.sortDir = action.payload;
            state.selectedItems = [];
        },
        [fetchItems.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.items = action.payload.data;
            state.totalPages = action.payload.last_page;
            state.totalItems = action.payload.total;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchItems.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export const wantedIssuesSelector = (state) => state.wanted;
export const { removeItems } = slice.actions;
export default slice.reducer;
