import {
    createAction,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const createActions = (type) => {
    const defaultState = {
        isLoading: false,
        isPopulated: false,
        items: [],
        isSchemaLoading: false,
        isSchemaPopulated: false,
        schema: [],
        selectedSchema: null,
        isTesting: false,
        isSaving: false,
    };

    const selectSchema = createAction("settings/" + type + "s/selectSchema");
    const deselectSchema = createAction("settings/" + type + "s/deselectSchema");

    const fetchItems = createAsyncThunk(
        "settings/" + type + "s/fetchItems",
        async () => {
            const response = await axios.get("/api/" + type);
            return response.data.data;
        }
    );

    const submitItem = createAsyncThunk(
        "settings/" + type + "s/submitItem",
        async (values, {dispatch}) => {
            let response = null;
            if (values.id) {
                response = await axios.put("/api/" + type + "/" + values.id, {values})
            } else {
                response = await axios.post("/api/" + type, {values})
            }

            if (response.data.data) {
                dispatch(fetchItems());
            }
        }
    );

    const submitSettings = createAsyncThunk(
        "settings/" + type + "s/submitSettings",
        async (values) => {
            const response = await axios.post("/api/settings", { [type + "s"]: values });
            if (response.data === 1) {
                toast.dark("Settings Saved");
            } else {
                //TODO: More refined error handling
                toast.dark("Error saving settings");
            }
        }
    );

    const fetchSchema = createAsyncThunk(
        "settings/" + type + "s/fetchSchema",
        async () => {
            const response = await axios.get("/api/" + type + "/schema");
            return response.data;
        }
    );

    const testItem = createAsyncThunk(
        "settings/" + type + "s/testItem",
        async (values) => {
            const response = await axios.post("/api/" + type + "/test", {values});
            return response.data;
        }
    );

    return {
        defaultState,
        selectSchema,
        deselectSchema,
        fetchItems,
        submitItem,
        testItem,
        submitSettings,
        fetchSchema,
    }
}

export default createActions;
