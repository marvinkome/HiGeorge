import PushNotification, {
    PushNotificationObject,
    PushNotificationScheduleObject,
} from "react-native-push-notification";
import { handler } from "./handler";

export class NotificationService {
    lastId: number;
    lastChannelCounter: number;

    constructor(onNotification: (notif: any) => void) {
        this.lastId = 0;
        this.lastChannelCounter = 0;

        this.createDefaultChannels();

        handler.attachNotification(onNotification);

        // clear badge number at start
        PushNotification.getApplicationIconBadgeNumber((number) => {
            if (number > 0) {
                PushNotification.setApplicationIconBadgeNumber(0);
            }
        });
    }

    createDefaultChannels = () => {
        PushNotification.createChannel(
            {
                channelId: "HiGeorge-channel-id",
                channelName: "Default Channel",
            },
            () => null
        );
    };

    popInitialNotification = () => {
        PushNotification.popInitialNotification((notif) => console.log("Initial notif", notif));
    };

    localNotification = (options: PushNotificationObject) => {
        const id = this.lastId++;

        const data = {
            ...options,
            id,
            channelId: "HiGeorge-channel-id",
            userInfo: {
                ...(options.userInfo || {}),
                id,
            },
        };

        PushNotification.localNotification(data);
    };

    scheduleNotification = (options: PushNotificationScheduleObject) => {
        const id = this.lastId++;

        const data = {
            ...options,
            id,
            channelId: "HiGeorge-channel-id",
            userInfo: {
                ...(options.userInfo || {}),
                id,
            },
        };

        PushNotification.localNotificationSchedule(data);
    };

    checkPermission(cbk: any) {
        return PushNotification.checkPermissions(cbk);
    }

    requestPermissions() {
        return PushNotification.requestPermissions();
    }

    cancelNotif() {
        PushNotification.cancelLocalNotifications({ id: `${this.lastId}` });
    }

    cancelAll() {
        PushNotification.cancelAllLocalNotifications();
    }

    abandonPermissions() {
        PushNotification.abandonPermissions();
    }

    getScheduledLocalNotifications(callback: any) {
        PushNotification.getScheduledLocalNotifications(callback);
    }
}
