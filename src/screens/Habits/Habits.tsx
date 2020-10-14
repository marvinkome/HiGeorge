import React from "react";
import { Container } from "components/Container";
import { Text } from "react-native-elements";
import { HabitCard } from "./HabitCard";
import { AddHabit } from "./AddHabit";
import { Day, Habit, Time } from "store";

type IProps = {
    habits: Habit[];
    addHabit: (data: { title: string; reminder: Time; interval: Day[] }) => void;
};

export function HabitsScreen(props: IProps) {
    return (
        <Container description="These are the habits you want to keep">
            {!props.habits?.length && (
                <Text>
                    You currently have no habit. Click the button to add a habit you want to track
                </Text>
            )}

            {props.habits?.map((habit) => (
                <HabitCard
                    key={habit.id}
                    title={habit.title}
                    interval={habit.interval}
                    reminder={habit.reminder}
                />
            ))}

            <AddHabit addHabit={props.addHabit} />
        </Container>
    );
}
