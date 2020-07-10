import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import comicsReducer from "@/Store/Slices/comics";
import issuesReducer from "@/Store/Slices/issues";
import addComicsReducer from "@/Store/Slices/addComics";
import settingsReducer from "@/Store/Slices/settings";

const createRootReducer = (history) =>
    combineReducers({
        comics: comicsReducer,
        issues: issuesReducer,
        addComics: addComicsReducer,
        settings: settingsReducer,
        router: connectRouter(history),
    });

export default createRootReducer;
