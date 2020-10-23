import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { Container } from "components/Container";
import { TaskCard } from "./TaskCard";
import { Habit } from "store";
import { TouchableOpacity } from "react-native-gesture-handler";
import dayjs from "dayjs";

type IProps = {
    habits: Habit[];
    completedHabits: Habit[];
    markAsDone: (id: string) => void;
};
export function TodayScreen(props: IProps) {
    const [showingCompleted, showCompleted] = useState(false);

    return (
        <Container description="Here’s what you're doing today">
            {!props.habits.length && <Text>All tasks completed for today</Text>}

            {props.habits?.map((habit) => (
                <TaskCard
                    key={habit.id}
                    done={
                        !!habit.lastCheckTime && dayjs(habit.lastCheckTime).day() === dayjs().day()
                    }
                    title={habit.title}
                    streak={habit.streak}
                    markAsDone={() => props.markAsDone(habit.id)}
                />
            ))}

            {!!props.completedHabits.length && (
                <TouchableOpacity onPress={() => showCompleted(!showingCompleted)}>
                    <View style={styles.viewCompleted}>
                        <Text style={styles.viewCompletedText}>
                            {showingCompleted ? "Hide completed tasks" : "View completed tasks"}
                        </Text>
                        <Icon
                            name={showingCompleted ? "chevron-up" : "chevron-down"}
                            type="feather"
                            size={18}
                        />
                    </View>
                </TouchableOpacity>
            )}

            {showingCompleted &&
                props.completedHabits.map((habit) => (
                    <TaskCard
                        done={
                            !!habit.lastCheckTime &&
                            dayjs(habit.lastCheckTime).day() === dayjs().day()
                        }
                        title={habit.title}
                        key={habit.id}
                        streak={habit.streak}
                        markAsDone={() => null}
                    />
                ))}
        </Container>
    );
}

const styles = StyleSheet.create({
    viewCompleted: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    viewCompletedText: {
        fontSize: 14,
        marginRight: 5,
    },
});
