import { Theme } from "react-native-elements";
import { fonts } from "./fonts";

export const colorTheme = {
    primary: "#317FF5",
    secondary: "#296ACC",
    background: "#F1F3F6",

    white: "#F9F9F9",
    black: "#333333",

    grey0: "#1A1F33",
    grey1: "#5B6176",
};

export const ElementsTheme: Theme = {
    colors: {
        ...colorTheme,
    },

    Text: {
        style: {
            fontSize: 16,
            ...fonts.regular,
        },
    },
};
