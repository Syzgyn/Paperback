import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import comicsReducer from "@/Store/Slices/comics";
import issuesReducer from "@/Store/Slices/issues";
import addComicsReducer from "@/Store/Slices/addComics";
import settingsReducer from "@/Store/Slices/settings";
import wantedReducer from "@/Store/Slices/wanted";
import pathsReducer from "@/Store/Slices/paths";
import rootFoldersReducer from "@/Store/Slices/rootFolders";
import importComicsReducer from "@/Store/Slices/importComics";

const createRootReducer = (history) =>
    combineReducers({
        addComics: addComicsReducer,
        comics: comicsReducer,
        importComics: importComicsReducer,
        issues: issuesReducer,
        router: connectRouter(history),
        settings: settingsReducer,
        wanted: wantedReducer,
        paths: pathsReducer,
        rootFolders: rootFoldersReducer,
    });

export default createRootReducer;
