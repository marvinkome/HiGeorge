import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { colorTheme } from "styles/theme";

export function RootHeader({ description }: { description: string }) {
    return (
        <View style={styles.headerContainer}>
            <Text h3 style={styles.greeting}>
                Hey 👋
            </Text>
            <Text>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colorTheme.white,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 15,
    },

    greeting: {
        marginBottom: 15,
    },
});
