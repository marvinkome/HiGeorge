import dayjs from "dayjs";
import shortId from "short-uuid";
import { persist } from "mobx-persist";
import { action, observable, computed, makeObservable } from "mobx";
import { NotificationService } from "libs/notification/service";

const objectSupport = require("dayjs/plugin/objectSupport");
dayjs.extend(objectSupport);

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

export const AllDays: Day[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export function createStore(notification: NotificationService) {
    class Store {
        @persist("list")
        habits: Habit[] = [];

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

        addHabit = (habitData: { title: string; reminder: Time; interval: Day[] }) => {
            const habit = {
                ...habitData,
                id: shortId.generate(),
                doneToday: false,
                streak: 0,
                longestStreak: 0,
            };

            this.habits.push(habit);

            // create notification
            const notificationObj: any = {
                title: "It's time to check-up on your habit",
                message: `Hey there 👋. Did you do "${habit.title}" today?`,
                actions: ["Yes"] as any,
                userInfo: {
                    habitId: habit.id,
                },
            };

            // if daily, schedule notification daily
            if (habit.interval.length === 7) {
                notification.scheduleNotification({
                    ...notificationObj,
                    date: dayjs(habit.reminder as any).toDate(),
                    repeatType: "day",
                });
            } else {
                // repeat weekly on specific days
                for (const day of habit.interval) {
                    notification.scheduleNotification({
                        ...notificationObj,
                        date: dayjs(habit.reminder as any)
                            .day(AllDays.indexOf(day))
                            .toDate(),
                        repeatType: "week",
                    });
                }
            }
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
