import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createRootReducer from "@/Store/Slices";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

const store = configureStore({
    reducer: createRootReducer(history),
    middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
});

export default store;
