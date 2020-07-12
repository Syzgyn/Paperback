import { combineReducers } from "redux";

import generalReducer from "@/Store/Slices/Settings/general";
import indexersReducer from "@/Store/Slices/Settings/indexers";
import downloadersReducer from "@/Store/Slices/Settings/downloaders";

export default combineReducers({
    general: generalReducer,
    indexers: indexersReducer,
    downloaders: downloadersReducer,
});
