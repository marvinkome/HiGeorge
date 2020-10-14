import dayjs from "dayjs";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-elements";
import { Day, Time } from "store";
import { colorTheme } from "styles/theme";

const objectSupport = require("dayjs/plugin/objectSupport");
dayjs.extend(objectSupport);

function getInterval(interval: Day[]) {
    if (interval.length === 7) {
        return "Everyday";
    }

    const text = interval.reduce((acc, curr) => `${acc}${curr.slice(0, 3)}, `, "");

    return text.slice(0, text.length - 2);
}

type IProps = {
    title: string;
    interval: Day[];
    reminder: Time;
};
export function HabitCard(props: IProps) {
    return (
        <View style={styles.container}>
            <Text>{props.title}</Text>

            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Icon
                        name="calendar"
                        type="feather"
                        size={16}
                        color={colorTheme.green}
                        style={{ marginRight: 5 }}
                    />

                    <Text style={styles.footerItemText}>{getInterval(props.interval)}</Text>
                </View>

                <View style={styles.footerItem}>
                    <Icon
                        name="alarm"
                        size={16}
                        color={colorTheme.red}
                        style={{ marginRight: 5 }}
                    />

                    <Text style={styles.footerItemText}>
                        {dayjs(props.reminder as any).format("h:mm A")}
                    </Text>
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
