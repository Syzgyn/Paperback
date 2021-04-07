import { combineReducers } from "redux";
import generalReducer from "@/Store/Slices/Settings/general";
//import indexersReducer from "@/Store/Slices/Settings/indexers";
//import downloadersReducer from "@/Store/Slices/Settings/downloaders";
import settingsConnectorReducer from "@/Store/Slices/Settings/settingsConnectors";
import uiReducer from "@/Store/Slices/Settings/ui";

export default combineReducers({
    general: generalReducer,
    indexers: settingsConnectorReducer,
    downloaders: settingsConnectorReducer,
});
