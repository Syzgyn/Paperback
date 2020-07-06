import {createAsyncThunk, createSlice, createSelector} from '@reduxjs/toolkit'
import {getCurrentCvidSelector} from '@/Store/Slices/router'

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
};

export const fetchComics = createAsyncThunk(
    'comics/fetchComics',
    async () => {
        const response = await axios.get('/api/comic')
        return response.data.data;
    },
);

const slice = createSlice({
    name: 'comics',
    initialState: defaultState,
    reducers: {},
    extraReducers: {
        [fetchComics.pending]: (state, actions) => {
            state.isLoading = true
        },
        [fetchComics.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true
            state.isLoading = false
        },
        [fetchComics.rejected]: (state, action) => {
            state.isLoading = false
        },
    },
});

export const comicsSelector = state => state.comics;
export const currentComicSelector = createSelector(
    [comicsSelector, getCurrentCvidSelector], 
    (comics, cvid) => comics.items.find(comic => comic.cvid == cvid)
);

export default slice.reducer
