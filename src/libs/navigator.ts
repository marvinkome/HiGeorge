import { createRef } from "react";
import { NavigationContainerRef } from "@react-navigation/native";

/* Navigation Ref */
export const navigationRef = createRef<NavigationContainerRef>();

/* Navigate function */
export function navigate(name: string, params?: any) {
    navigationRef.current?.navigate(name, params);
}
