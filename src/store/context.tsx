import React from "react";
import { createStore, TStore } from "./index";

export const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider: React.FC = ({ children }) => {
    const store = createStore();

    return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};
