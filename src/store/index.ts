import dayjs from "dayjs";
import shortId from "short-uuid";
import { action, observable, computed, makeObservable } from "mobx";

export type Time = {
    hour: number;
    minute: number;
};

export type Day =
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";

export type Habit = {
    id: string;
    title: string;
    reminder: Time;
    interval: Day[];

    doneToday: boolean;

    streak: number;
    longestStreak: number;
};

export function createStore() {
    class Store {
        habits: Habit[] = [
            {
                id: shortId.generate(),
                title: "Do pushups every morning",
                reminder: { hour: 9, minute: 0 },
                interval: ["Monday", "Wednesday", "Thursday", "Friday"],
                doneToday: true,
                streak: 1,
                longestStreak: 1,
            },
            {
                id: shortId.generate(),
                title: "Take a lecture on physics",
                reminder: { hour: 9, minute: 0 },
                interval: ["Monday", "Thursday", "Saturday"],
                doneToday: false,
                streak: 0,
                longestStreak: 1,
            },
            {
                id: shortId.generate(),
                title: "Learn programming",
                reminder: { hour: 9, minute: 0 },
                interval: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
                doneToday: false,
                streak: 0,
                longestStreak: 10,
            },
            {
                id: shortId.generate(),
                title: "Go to bed early",
                reminder: { hour: 9, minute: 0 },
                interval: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
                doneToday: false,
                streak: 0,
                longestStreak: 10,
            },
            {
                id: shortId.generate(),
                title: "Cook",
                reminder: { hour: 9, minute: 0 },
                interval: ["Monday", "Wednesday", "Friday", "Sunday"],
                doneToday: false,
                streak: 0,
                longestStreak: 10,
            },
        ];

        constructor() {
            makeObservable(this, {
                habits: observable,
                addHabit: action,
                markHabitAsDone: action,
                editHabit: action,
                todaysHabits: computed,
                todaysCompletedHabits: computed,
            });
        }

        addHabit = (habit: { title: string; reminder: Time; interval: Day[] }) => {
            this.habits.push({
                ...habit,
                id: shortId.generate(),
                doneToday: false,
                streak: 0,
                longestStreak: 0,
            });
        };

        markHabitAsDone = (habitId: string) => {
            const habitIdx = this.habits.findIndex((h) => h.id === habitId);
            if (habitIdx < 0) {
                return false;
            }

            this.habits[habitIdx].doneToday = true;
            this.habits[habitIdx].streak += 1;
            this.habits[habitIdx].longestStreak += 1;

            return true;
        };

        editHabit = (
            data: { title?: string; reminder?: Time; interval?: Day[] },
            habitId: string
        ) => {
            const habitIdx = this.habits.findIndex((h) => h.id === habitId);
            if (habitIdx < 0) {
                return false;
            }

            this.habits[habitIdx] = {
                ...data,
                ...this.habits[habitIdx],
            };

            return true;
        };

        get todaysHabits() {
            console.log("computing");
            const today = dayjs(new Date()).format("dddd") as Day;
            return this.habits.filter(
                (habit) => habit.interval.includes(today) && !habit.doneToday
            );
        }

        get todaysCompletedHabits() {
            const today = dayjs(new Date()).format("dddd") as Day;
            return this.habits.filter((habit) => habit.interval.includes(today) && habit.doneToday);
        }
    }

    return new Store();
}

export type TStore = ReturnType<typeof createStore>;
