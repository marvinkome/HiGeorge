import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "store/hook";
import { HabitsScreen } from "./Habits";

export const Habits = observer(() => {
    const { habits, addHabit } = useStore((store) => ({
        habits: store.habits,
        addHabit: store.addHabit,
    }));

    console.log(habits);
    return <HabitsScreen habits={habits} addHabit={addHabit} />;
});
