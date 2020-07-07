import {current, createAsyncThunk, createSlice, createSelector, createAction} from '@reduxjs/toolkit'
import {getCurrentCvidSelector} from '@/Store/Slices/router'

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
};

export const fetchIssues = createAsyncThunk(
    'issues/fetchIssues',
    async (cvid) => {
        const response = await axios.get('/api/issue/byComic/' + cvid)
        return response.data.data;
    },
);


const slice = createSlice({
    name: 'issues',
    initialState: defaultState,
    reducers: {
        removeIssues(state, action) {
            state.items = [];
            state.isPopulated = false;
        }
    },
    extraReducers: {
        [fetchIssues.pending]: (state, action) => {
            state.isLoading = true
        },
        [fetchIssues.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isPopulated = true
            state.isLoading = false
console.log(current(state));
        },
        [fetchIssues.rejected]: (state, action) => {
            state.isLoading = false
        },
    },
});

export const issuesSelector = state => state.issues;
export const {removeIssues} = slice.actions;
export default slice.reducer
