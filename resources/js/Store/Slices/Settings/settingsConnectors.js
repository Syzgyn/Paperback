import {
    createAction,
    createAsyncThunk,
    createSlice,
    current,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { batch } from "react-redux";
import { createSelector } from "reselect";
import { settingsConnectorPathSelector } from "@/Store/Selectors/settingsConnectorPath";

const defaultState = {
    isLoading: false,
    isPopulated: false,
    items: [],
    selectedItem: null,
    isSchemaLoading: false,
    isSchemaPopulated: false,
    schema: [],
    selectedSchema: null,
    isTesting: false,
    isSaving: false,
    showAddModal: false,
    showEditModal: false,
};

const selectSchema = createAction("settings/items/selectSchema");
const deselectSchema = createAction("settings/items/deselectSchema");

const selectItem = createAction("settings/items/selectItem");
const deselectItem = createAction("settings/items/deselectItem");

const toggleEditModal = createAction("settings/items/toggleEditModal");
const toggleAddModal = createAction("settings/items/toggleAddModal");

function selectSchemaAndToggleEditModal(schema) {
    return (dispatch) => {
        batch(() => {
            dispatch(selectSchema(schema));
            dispatch(toggleAddModal());
            dispatch(toggleEditModal());
        });
    };
}

function showItem(item) {
    return (dispatch) => {
        batch(() => {
            dispatch(selectItem(item));
            dispatch(toggleEditModal());
        });
    };
}

function getApiPath(state) {
    let pathname = state.router.location.pathname;
    if (pathname == "/settings/indexers") {
        return "indexer";
    }

    if (pathname == "/settings/downloaders") {
        return "downloader";
    }

    return null;
}

const fetchItems = createAsyncThunk(
    "settings/items/fetchItems",
    async (arg, { getState }) => {
        const response = await axios.get("/api/" + getApiPath(getState()));
        return response.data.data;
    }
);

const submitItem = createAsyncThunk(
    "settings/items/submitItem",
    async (values, { dispatch, getState }) => {
        let response = null;
        if (values.id) {
            response = await axios.put(
                "/api/" + getApiPath(getState()) + "/" + values.id,
                { ...values }
            );
        } else {
            response = await axios.post("/api/" + getApiPath(getState()), {
                ...values,
            });
        }

        console.log(response.data);

        if (response.data.data) {
            dispatch(toggleEditModal());
            dispatch(fetchItems());
            return true;
        }
    }
);

const deleteItem = createAsyncThunk(
    "settings/items/deleteItem",
    async (id, { dispatch, getState }) => {
        const response = await axios.delete(
            "/api/" + getApiPath(getState()) + "/" + id
        );

        if (response.data.status == "OK") {
            dispatch(toggleEditModal());
            dispatch(fetchItems());
            return true;
        }
    },
    {
        condition: () => {
            return confirm("Confirm Delete?");
        },
    }
);

const submitSettings = createAsyncThunk(
    "settings/items/submitSettings",
    async (values, { getState }) => {
        const response = await axios.post("/api/settings", {
            [getApiPath(getState()) + "s"]: values,
        });
        if (response.data === 1) {
            toast.dark("Settings Saved");
        } else {
            //TODO: More refined error handling
            toast.dark("Error saving settings");
        }
    }
);

const fetchSchema = createAsyncThunk(
    "settings/items/fetchSchema",
    async (values, { getState }) => {
        const response = await axios.get(
            "/api/" + getApiPath(getState()) + "/schema"
        );
        return response.data;
    }
);

const testItem = createAsyncThunk(
    "settings/items/testItem",
    async (values, { getState }) => {
        const response = await axios.post(
            "/api/" + getApiPath(getState()) + "/test",
            { ...values }
        );
        if (response.data.result) {
            toast.dark("Test Successful");
        } else {
            toast.dark("Test Failed");
        }
    }
);

export {
    defaultState,
    selectSchemaAndToggleEditModal,
    selectSchema,
    deselectSchema,
    toggleEditModal,
    toggleAddModal,
    fetchItems,
    submitItem,
    deleteItem,
    testItem,
    submitSettings,
    fetchSchema,
    showItem,
};

function correctStatePath(state, action) {
    return action.statePath && action.statePath === current(state).key;
}

export const slice = createSlice({
    name: "settings/items",
    initialState: defaultState,
    reducers: {
        removeItems: (state) => (state.items = []),
    },
    extraReducers: {
        [selectSchema]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.selectedSchema = action.payload;
        },
        [deselectSchema]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.selectedSchema = null;
        },
        [selectItem]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.selectedItem = action.payload;
        },
        [deselectItem]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.selectedItem = null;
        },
        [toggleEditModal]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.showEditModal = !current(state).showEditModal;
        },
        [toggleAddModal]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.showAddModal = !current(state).showAddModal;
        },
        [fetchItems.pending]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.isLoading = true;
        },
        [fetchItems.fulfilled]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.items = action.payload;
            state.isPopulated = true;
            state.isLoading = false;
            let currentState = current(state);
            if (!currentState.showAddModal && !currentState.showEditModal) {
                state.selectedSchema = null;
                state.selectedItem = null;
            }
        },
        [fetchItems.rejected]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.isLoading = false;
        },
        [submitItem.pending]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.isSaving = true;
        },
        [submitItem.fulfilled]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.isSaving = false;
        },
        [submitItem.rejected]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            //TODO: Error handling
            state.isSaving = false;
        },
        [fetchSchema.pending]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.isSchemaLoading = true;
        },
        [fetchSchema.fulfilled]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.schema = action.payload;
            state.isSchemaPopulated = true;
            state.isSchemaLoading = false;
        },
        [fetchSchema.rejected]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.isSchemaLoading = false;
        },
        [testItem.pending]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.isTesting = true;
        },
        [testItem.fulfilled]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.isTesting = false;
        },
        [testItem.rejected]: (state, action) => {
            if (!correctStatePath(state, action)) {
                return state;
            }
            state.isTesting = false;
        },
    },
});

export const settingsItemsSelector = createSelector(
    [(state) => state.settings, settingsConnectorPathSelector],
    (settings, path) => settings[path]
);
export const { removeItems } = slice.actions;

export default slice.reducer;
