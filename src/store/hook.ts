import React from "react";
import { TStore } from "store";
import { storeContext } from "./context";

export const useStoreData = <Selection, ContextData, Store>(
    context: React.Context<ContextData>,
    storeSelector: (contextData: ContextData) => Store,
    dataSelector: (store: Store) => Selection
) => {
    const value = React.useContext(context);

    const store = storeSelector(value);

    return dataSelector(store);
};

export const useStore = <Selection>(dataSelector: (store: TStore) => Selection) => {
    const store = React.useContext(storeContext);

    if (!store) {
        throw new Error("useStore must be used within a StoreProvider.");
    }

    return dataSelector(store);
};
