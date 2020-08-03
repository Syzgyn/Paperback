import {
    createAction,
    createAsyncThunk,
    createSlice,
    createSelector,
    current,
} from "@reduxjs/toolkit";
import { getCurrentCvidSelector } from "@/Store/Slices/router";
import axios from "axios";
import { push } from "connected-react-router";
import { batch } from "react-redux";
import { toast } from "react-toastify";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
    sortKey: "sortName",
    sortDir: "asc",
};

export const fetchComics = createAsyncThunk("comics/fetchComics", async () => {
    const response = await axios.get("/api/comic");
    return response.data.data;
});

export const deleteComic = createAsyncThunk(
    "comics/deleteComic",
    async (cvid, { dispatch }) => {
        const response = await axios.delete("/api/comic/" + cvid);
        if (response.data.status == "OK") {
            toast("Comic Deleted");
            batch(() => {
                dispatch(push("/"));
                dispatch(fetchComics());
            });
        }
    },
    {
        condition: () => {
            return confirm("Delete Comic?");
        },
    }
);

export const toggleComicMonitored = createAction("comics/toggleComicMonitored");
export const setComicSort = createAction("comics/setComicSort");

const slice = createSlice({
    name: "comics",
    initialState: defaultState,
    reducers: {},
    extraReducers: {
        [toggleComicMonitored]: (state, { payload }) => {
            console.log("inside");
            const { cvid, monitored } = payload;

            const index = state.items.findIndex((item) => item.cvid == cvid);
            state.items[index].monitored = monitored;
        },
        [fetchComics.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchComics.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
        },
        [fetchComics.rejected]: (state) => {
            state.isLoading = false;
        },
        [deleteComic.rejected]: () => {
            //TODO: Error handling
        },
        [setComicSort]: (state, action) => {
            const currentState = current(state);
            const oldKey = currentState.sortKey;
            const oldDir = currentState.sortDir;
            const newDir = oldDir == "asc" ? "desc" : "asc";

            if (oldKey === action.payload) {
                state.sortDir = newDir;
            } else {
                state.sortKey = action.payload;
                state.sortDir = "asc";
            }
        },
    },
});

export const comicsSelector = (state) => state.comics;
export const currentComicSelector = createSelector(
    [comicsSelector, getCurrentCvidSelector],
    (comics, cvid) => comics.items.find((comic) => comic.cvid == cvid)
);

const comicsSortSelector = (state) => {
    return { key: state.comics.sortKey, dir: state.comics.sortDir };
};
export const sortedComicsSelector = createSelector(
    [comicsSelector, comicsSortSelector],
    (comics, sort) => {
        let clone = Object.assign({}, comics);
        let items = clone.items.slice().sort(function (a, b) {
            if (sort.dir == "asc") {
                return a[sort.key] > b[sort.key] ? 1 : -1;
            } else {
                return a[sort.key] < b[sort.key] ? 1 : -1;
            }
        });

        clone.items = items;

        return clone;
    }
);

export default slice.reducer;
