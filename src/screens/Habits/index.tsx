import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "store/hook";
import { HabitsScreen } from "./Habits";

export const Habits = observer(() => {
    const { habits, addHabit } = useStore((store) => ({
        habits: store.habits,
        addHabit: store.addHabit,
    }));

    return <HabitsScreen habits={habits.slice()} addHabit={addHabit} />;
});
