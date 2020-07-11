import { combineReducers } from "redux";

import generalReducer from "@/Store/Slices/Settings/general";
import indexersReducer from "@/Store/Slices/Settings/indexers";

export default combineReducers({
    general: generalReducer,
    indexers: indexersReducer,
});
