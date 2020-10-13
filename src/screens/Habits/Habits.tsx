import React from "react";
import { Container } from "components/Container";
import { HabitCard } from "./HabitCard";
import { AddHabit } from "./AddHabit";

export function HabitsScreen() {
    return (
        <Container description="These are the habits you want to keep">
            <HabitCard />
            <HabitCard />

            <AddHabit />
        </Container>
    );
}
