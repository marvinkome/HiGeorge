import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon, CheckBox, Text } from "react-native-elements";
import { colorTheme } from "styles/theme";

export function TaskCard() {
    return (
        <View style={styles.container}>
            <CheckBox
                checkedIcon={<Icon name="checkmark-circle-outline" type="ionicon" />}
                uncheckedIcon={<Icon name="circle" type="feather" />}
                checked={false}
                containerStyle={{ justifyContent: "center" }}
            />

            <View style={styles.taskDetails}>
                <Text>Plan marketing stretegy with Mark and Steve</Text>

                <View style={styles.time}>
                    <Icon
                        name="alarm"
                        size={16}
                        color={colorTheme.red}
                        style={{ marginRight: 5 }}
                    />
                    <Text style={{ fontSize: 14 }}>9:00 AM</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: colorTheme.white,
        marginBottom: 20,
        borderRadius: 15,
        elevation: 5,
    },

    taskDetails: {
        flex: 1,
        paddingVertical: 20,
    },

    time: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
    },
});
