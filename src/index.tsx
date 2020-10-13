import "react-native-gesture-handler";
import React from "react";
import { navigationRef } from "libs/navigator";
import { ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./navigators";
import { ElementsTheme } from "styles/theme";

export default function App() {
    return (
        <ThemeProvider theme={ElementsTheme}>
            <NavigationContainer ref={navigationRef}>
                <RootNavigator />
            </NavigationContainer>
        </ThemeProvider>
    );
}
