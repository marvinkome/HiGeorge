import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { colorTheme } from "styles/theme";
import { fonts } from "styles/fonts";
import { Icon, Text } from "react-native-elements";

// screens
import { LandingPage } from "screens/LandingPage";
import { Today } from "screens/Today";
import { Habits } from "screens/Habits";
import { AddHabit } from "screens/AddHabit";
// import { Goals } from "screens/Goals";

const EmptyScreen = () => null;

const HomeTab = createBottomTabNavigator();
const tabBarOptions = () => ({
    style: navigationStyles.tabBar,
});
export function HomeTabNavigator() {
    return (
        <HomeTab.Navigator initialRouteName="Habits" tabBarOptions={tabBarOptions()}>
            <HomeTab.Screen
                name="Today"
                component={Today}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={[
                                navigationStyles.tabBarLabel,
                                { color: focused ? colorTheme.secondary : colorTheme.black },
                            ]}
                        >
                            Today
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="clock"
                            type="simple-line-icon"
                            size={23}
                            color={focused ? colorTheme.secondary : colorTheme.black}
                        />
                    ),
                }}
            />

            <HomeTab.Screen
                name="Habits"
                component={Habits}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={[
                                navigationStyles.tabBarLabel,
                                { color: focused ? colorTheme.secondary : colorTheme.black },
                            ]}
                        >
                            Habits
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="rotate-cw"
                            type="feather"
                            size={23}
                            color={focused ? colorTheme.secondary : colorTheme.black}
                        />
                    ),
                }}
            />

            {/* <HomeTab.Screen
                name="Goals"
                component={Goals}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={[
                                navigationStyles.tabBarLabel,
                                { color: focused ? colorTheme.secondary : colorTheme.black },
                            ]}
                        >
                            Goals
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="award"
                            type="feather"
                            size={23}
                            color={focused ? colorTheme.secondary : colorTheme.black}
                        />
                    ),
                }}
            /> */}
        </HomeTab.Navigator>
    );
}

const MainStack = createStackNavigator();
export function MainStackNavigator() {
    return (
        <MainStack.Navigator headerMode="none">
            <MainStack.Screen name="Home" component={HomeTabNavigator} />
            <MainStack.Screen name="AddHabit" component={AddHabit} />
            <MainStack.Screen name="AddGoal" component={EmptyScreen} />
            <MainStack.Screen name="GoalDetails" component={EmptyScreen} />
        </MainStack.Navigator>
    );
}

const RootStack = createStackNavigator();
export function RootNavigator() {
    const isLoggedIn = true;
    return (
        <RootStack.Navigator headerMode="none">
            {isLoggedIn ? (
                <RootStack.Screen name="Main" component={HomeTabNavigator} />
            ) : (
                <RootStack.Screen name="LandingPage" component={LandingPage} />
            )}
        </RootStack.Navigator>
    );
}

const navigationStyles = StyleSheet.create({
    tabBar: {
        backgroundColor: colorTheme.white,
        borderTopColor: "#0000001a",
        height: 62,
        paddingBottom: 5,
    },
    tabBarLabel: {
        ...fonts.regular,
        fontSize: 12,
    },
});
