import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { Container } from "components/Container";
import { TaskCard } from "./TaskCard";

export function TodayScreen() {
    return (
        <Container description="Here’s what you’re focusing on today">
            <TaskCard />
            <TaskCard />

            <View style={styles.viewCompleted}>
                <Text style={styles.viewCompletedText}>View completed tasks</Text>
                <Icon name="chevron-down" type="feather" size={18} />
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    viewCompleted: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },
    viewCompletedText: {
        fontSize: 14,
        marginRight: 5,
    },
});
