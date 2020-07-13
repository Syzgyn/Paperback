import { settingsConnectorPathSelector } from "@/Store/Selectors/settingsConnectorPath";

const connectorPathEnhancer = {
    actionTypes: [
        "settings/items/fetchItems/pending",
        "settings/items/fetchItems/fulfilled",
        "settings/items/fetchItems/rejected",
        "settings/items/fetchSettings/pending",
        "settings/items/fetchSettings/fulfilled",
        "settings/items/fetchSettings/rejected",
        "settings/items/fetchSchema/pending",
        "settings/items/fetchSchema/fulfilled",
        "settings/items/fetchSchema/rejected",
        "settings/items/submitItem/pending",
        "settings/items/submitItem/fulfilled",
        "settings/items/submitItem/rejected",
        "settings/items/testItem/pending",
        "settings/items/testItem/fulfilled",
        "settings/items/testItem/rejected",
        "settings/items/selectSchema",
        "settings/items/deselectSchema",
        "settings/items/selectItem",
        "settings/items/deselectItem",
        "settings/items/toggleEditModal",
        "settings/items/toggleAddModal",
        "settings/items/removeItems",
    ],
    mapState: (state) => {
        return {
            statePath: settingsConnectorPathSelector(state),
        };
    },
};

export default () => [connectorPathEnhancer];
