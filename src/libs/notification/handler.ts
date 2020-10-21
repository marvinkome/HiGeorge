import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";

class NotificationHandler {
    _onRegister: ((token: { os: string; token: string }) => void) | undefined;
    _onNotification: ((notification: any) => void) | undefined;

    attachRegister = (handler: (token: { os: string; token: string }) => void) => {
        this._onRegister = handler;
    };

    attachNotification = (handler: (notification: any) => void) => {
        this._onNotification = handler;
    };

    onNotification = (notification: any) => {
        if (typeof this._onNotification === "function") {
            this._onNotification(notification);
        }
    };

    onRegister = (token: { os: string; token: string }) => {
        if (typeof this._onRegister === "function") {
            this._onRegister(token);
        }
    };

    onAction = (notification: any) => {
        if (notification.actions === "Yes") {
            PushNotification.invokeApp(notification);
        }
    };
}

export const handler = new NotificationHandler();

PushNotification.configure({
    onRegister: handler.onRegister,
    onNotification: handler.onNotification,
    onAction: handler.onAction,
    onRegistrationError: () => console.log("reg error"),
    popInitialNotification: true,
    requestPermissions: Platform.OS === "ios",
});
