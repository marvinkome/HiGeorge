import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { colorTheme } from "styles/theme";
import { RootHeader } from "./Header";

export function Container(props: { description: string; children: any }) {
    return (
        <View style={styles.container}>
            <RootHeader description={props.description} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.innerContainer}
                keyboardShouldPersistTaps="always"
            >
                {props.children}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorTheme.white,
        flex: 1,
    },

    innerContainer: {
        flexGrow: 1,
        backgroundColor: colorTheme.background,
        elevation: 3,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingVertical: 25,
        paddingHorizontal: 20,
    },
});
