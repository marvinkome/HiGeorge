import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-elements";
import { colorTheme } from "styles/theme";

export function HabitCard() {
    return (
        <View style={styles.container}>
            <Text>Do pushups in the morning</Text>

            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Icon
                        name="calendar"
                        type="feather"
                        size={16}
                        color={colorTheme.green}
                        style={{ marginRight: 5 }}
                    />

                    <Text style={styles.footerItemText}>Everyday</Text>
                </View>

                <View style={styles.footerItem}>
                    <Icon
                        name="alarm"
                        size={16}
                        color={colorTheme.red}
                        style={{ marginRight: 5 }}
                    />

                    <Text style={styles.footerItemText}>9:00 AM</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorTheme.white,
        marginBottom: 20,
        borderRadius: 15,
        elevation: 5,
        padding: 25,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    footerItem: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
    },

    footerItemText: {
        fontSize: 14,
    },
});
