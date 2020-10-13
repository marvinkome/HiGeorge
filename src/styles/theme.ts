import { Theme } from "react-native-elements";
import { fonts } from "./fonts";

export const colorTheme = {
    primary: "#317FF5",
    secondary: "#296ACC",
    background: "#F1F3F6",

    white: "#F9F9F9",
    black: "#333333",
    red: "#FE6358",
    green: "#6FCF97",

    grey0: "#1A1F33",
    grey1: "#5B6176",
    grey2: "#555555",

    shadow: "#0000001a",
};

export const ElementsTheme: Theme = {
    colors: {
        ...colorTheme,
    },

    Text: {
        style: {
            fontSize: 16,
            color: colorTheme.grey1,
            ...fonts.regular,
        },

        h1Style: {
            fontSize: 39,
            ...fonts.bold,
        },

        h2Style: {
            fontSize: 32,
            ...fonts.bold,
        },

        h3Style: {
            fontSize: 25,
            ...fonts.bold,
        },

        h4Style: {
            fontSize: 20,
            ...fonts.semiBold,
        },
    },

    Input: {
        inputStyle: {
            ...fonts.regular,
            fontSize: 17,
        },
    },

    Button: {
        containerStyle: {
            marginBottom: 10,
        },

        buttonStyle: {
            borderRadius: 50,
            paddingVertical: 15,
            backgroundColor: colorTheme.primary,
        },

        icon: {
            color: colorTheme.white,
        },

        titleStyle: {
            fontSize: 16,
            ...fonts.semiBold,
        },
    },
};
