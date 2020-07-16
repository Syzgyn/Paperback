import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import comicsReducer from "@/Store/Slices/comics";
import issuesReducer from "@/Store/Slices/issues";
import addComicsReducer from "@/Store/Slices/addComics";
import settingsReducer from "@/Store/Slices/settings";
import wantedReducer from "@/Store/Slices/wanted";

const createRootReducer = (history) =>
    combineReducers({
        addComics: addComicsReducer,
        comics: comicsReducer,
        issues: issuesReducer,
        router: connectRouter(history),
        settings: settingsReducer,
        wanted: wantedReducer,
    });

export default createRootReducer;
