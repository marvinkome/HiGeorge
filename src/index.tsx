import "react-native-gesture-handler";
import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { navigationRef } from "libs/navigator";
import { ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./navigators";
import { create } from "mobx-persist";
import { ElementsTheme } from "styles/theme";
import { storeContext } from "store/context";
import { createStore } from "store";
import { NotificationService } from "libs/notification/service";

const notification = new NotificationService((notifObj: any) => {
    // on click notification
    console.log(notifObj);

    if (notifObj.action === "Yes") {
        store.markHabitAsDone(notifObj.data.habitId);
    }
});

// AsyncStorage.clear();
// notification.cancelAll();
// notification.getScheduledLocalNotifications((n: any) => console.log(n));

// setup mobx state
const store = createStore(notification);
const hydrate = create({ storage: AsyncStorage });
hydrate("HiGeorgeState", store);

export default function App() {
    return (
        <storeContext.Provider value={store}>
            <ThemeProvider theme={ElementsTheme}>
                <NavigationContainer ref={navigationRef}>
                    <RootNavigator />
                </NavigationContainer>
            </ThemeProvider>
        </storeContext.Provider>
    );
}
