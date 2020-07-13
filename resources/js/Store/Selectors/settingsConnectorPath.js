import { createSelector } from "reselect";
import { getLocation } from "connected-react-router";

export const settingsConnectorPathSelector = createSelector(
    [getLocation],
    ({ pathname }) => {
        if (pathname == "/settings/indexers") {
            return "indexers";
        }

        if (pathname == "/settings/downloaders") {
            return "downloaders";
        }

        return null;
    }
);
