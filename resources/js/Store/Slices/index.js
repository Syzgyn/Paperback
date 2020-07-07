import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import comicsReducer from "@/Store/Slices/comics";
import issuesReducer from "@/Store/Slices/issues";
import addComicsReducer from '@/Store/Slices/addComics';

const createRootReducer = (history) =>
    combineReducers({
        comics: comicsReducer,
        issues: issuesReducer,
        addComics: addComicsReducer,
        router: connectRouter(history),
    });

export default createRootReducer;
