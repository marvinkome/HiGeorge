import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "store/hook";
import { TodayScreen } from "./Today";

export const Today = observer(() => {
    const { habits, completedHabits, markAsDone } = useStore((store) => ({
        habits: store.todaysHabits,
        completedHabits: store.todaysCompletedHabits,
        markAsDone: store.markHabitAsDone,
    }));

    return (
        <TodayScreen habits={habits} completedHabits={completedHabits} markAsDone={markAsDone} />
    );
});
