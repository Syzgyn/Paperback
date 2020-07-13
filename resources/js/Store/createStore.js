import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createRootReducer from "@/Store/Slices";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createActionEnhancerMiddleware from "redux-action-enhancer";
import enhancers from "@/Store/actionEnhancers";
import { defaultState as defaultSettingsConnectorState } from "@/Store/Slices/Settings/settingsConnectors";

export const history = createBrowserHistory();

const store = configureStore({
    reducer: createRootReducer(history),
    middleware: [
        ...getDefaultMiddleware(),
        routerMiddleware(history),
        createActionEnhancerMiddleware(enhancers),
    ],
    devTools: { trace: true, traceLimit: 25 },
    preloadedState: {
        settings: {
            indexers: Object.assign({}, defaultSettingsConnectorState, {
                key: "indexers",
            }),
            downloaders: Object.assign({}, defaultSettingsConnectorState, {
                key: "downloaders",
            }),
        },
    },
});

export default store;
