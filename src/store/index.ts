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

    lastCheckTime: Date | null;

    streak: number;
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

function getPrevDay(interval: Day[]) {
    const today = dayjs().day();

    const sortInterval = interval
        .map((day) => {
            const idx = AllDays.indexOf(day);
            const dayDiff = idx - today;
            return {
                id: dayDiff < 0 ? dayDiff + AllDays.length : dayDiff,
                day,
            };
        })
        .sort((a, b) => a.id - b.id)
        .map((i) => i.day);

    console.log(sortInterval);

    const prevDay = sortInterval[sortInterval.length - 1];
    return AllDays.indexOf(prevDay);
}

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
                setup: action,
                todaysHabits: computed,
                todaysCompletedHabits: computed,
            });
        }

        addHabit = (habitData: { title: string; reminder: Time; interval: Day[] }) => {
            const habit: Habit = {
                ...habitData,
                id: shortId.generate(),
                streak: 0,
                lastCheckTime: null,
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
                let date = dayjs(habit.reminder as any);
                if (date.isBefore(dayjs())) {
                    date = dayjs(habit.reminder as any).add(1, "d");
                }

                notification.scheduleNotification({
                    ...notificationObj,
                    date: date.toDate(),
                    repeatType: "day",
                });
            } else {
                // repeat weekly on specific days
                for (const day of habit.interval) {
                    let date = dayjs(habit.reminder as any).day(AllDays.indexOf(day));
                    if (date.isBefore(dayjs())) {
                        date = dayjs(habit.reminder as any)
                            .day(AllDays.indexOf(day))
                            .add(1, "w");
                    }

                    notification.scheduleNotification({
                        ...notificationObj,
                        date: date.toDate(),
                        repeatType: "week",
                    });
                }
            }
        };

        markHabitAsDone = (habitId: string) => {
            const habit = this.habits.find((h) => h.id === habitId);
            if (!habit) {
                return false;
            }

            const done = habit.lastCheckTime && dayjs(habit.lastCheckTime).day() === dayjs().day();

            if (!done) {
                habit.lastCheckTime = new Date();
                habit.streak += 1;
            }

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

        setup = () => {
            for (const habit of this.habits) {
                // check if user did habit the last time he/she promised to
                if (!habit.lastCheckTime) {
                    habit.streak = 0;
                    return;
                }

                const lastCheckTime = dayjs(habit.lastCheckTime).day();
                const promisedTime = getPrevDay(habit.interval);

                if (lastCheckTime !== promisedTime) {
                    // reset streak
                    habit.streak = 0;
                    return;
                }
            }
        };

        get todaysHabits() {
            const today = dayjs(new Date()).format("dddd") as Day;
            return this.habits.filter(
                (habit) =>
                    habit.interval.includes(today) &&
                    !(habit.lastCheckTime && dayjs(habit.lastCheckTime).day() === dayjs().day())
            );
        }

        get todaysCompletedHabits() {
            const today = dayjs(new Date()).format("dddd") as Day;
            return this.habits.filter(
                (habit) =>
                    habit.interval.includes(today) &&
                    habit.lastCheckTime &&
                    dayjs(habit.lastCheckTime).day() === dayjs().day()
            );
        }
    }

    return new Store();
}

export type TStore = ReturnType<typeof createStore>;
