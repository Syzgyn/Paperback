import { combineReducers } from "redux";

import generalReducer from "@/Store/Slices/Settings/general";

export default combineReducers({
    general: generalReducer,
});
