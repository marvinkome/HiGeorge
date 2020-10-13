import React from "react";
import { Container } from "components/Container";
import { Button } from "react-native-elements";
import { HabitCard } from "./HabitCard";
import { StyleSheet } from "react-native";

export function HabitsScreen() {
    return (
        <Container description="These are the habits you want to keep">
            <HabitCard />
            <HabitCard />
            <HabitCard />
            <HabitCard />
            <HabitCard />

            <Button
                containerStyle={styles.addHabitButton}
                buttonStyle={{ width: "70%" }}
                icon={{ name: "plus", type: "feather" }}
                title="Add a habit"
            />
        </Container>
    );
}

const styles = StyleSheet.create({
    addHabitButton: {
        marginTop: 20,
        alignItems: "center",
    },
});
