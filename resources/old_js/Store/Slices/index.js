import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import comicsReducer from "@/Store/Slices/comics";
import comicIndexReducer from "@/Store/Slices/comicIndex";
import issuesReducer from "@/Store/Slices/issues";
import settingsReducer from "@/Store/Slices/settings";
import wantedReducer from "@/Store/Slices/wanted";
import pathsReducer from "@/Store/Slices/paths";
import rootFoldersReducer from "@/Store/Slices/rootFolders";
import importComicsReducer from "@/Store/Slices/importComics";
import tagsReducer from "@/Store/Slices/tags";

const createRootReducer = (history) =>
    combineReducers({
        comics: comicsReducer,
        comicIndex: comicIndexReducer,
        issues: issuesReducer,
        router: connectRouter(history),
        settings: settingsReducer,
        wanted: wantedReducer,
        paths: pathsReducer,
        rootFolders: rootFoldersReducer,
        tags: tagsReducer,
    });

export default createRootReducer;
