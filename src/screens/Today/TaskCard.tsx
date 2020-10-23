import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon, CheckBox, Text } from "react-native-elements";
import { fonts } from "styles/fonts";
import { colorTheme } from "styles/theme";

type IProps = {
    done: boolean;
    title: string;
    streak: number;
    markAsDone: () => void;
};
export function TaskCard(props: IProps) {
    return (
        <View style={styles.container}>
            <CheckBox
                containerStyle={{ justifyContent: "center" }}
                checkedIcon={<Icon name="checkmark-circle-outline" type="ionicon" />}
                uncheckedIcon={<Icon name="circle" type="feather" />}
                checked={props.done}
                onPress={props.markAsDone}
            />

            <View style={styles.taskDetails}>
                <Text>{props.title}</Text>

                <View style={styles.time}>
                    <Icon
                        name="flame"
                        type="ionicon"
                        size={16}
                        color={props.streak ? colorTheme.red : colorTheme.grey1}
                        style={{ marginRight: 5 }}
                    />
                    <Text style={{ ...fonts.bold }}>
                        {props.streak} {props.streak !== 1 ? "days" : "day"} streak
                    </Text>
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
