import React from "react";
import { TStore } from "./index";

export const storeContext = React.createContext<TStore | null>(null);
