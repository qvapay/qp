import { createTheme } from '@rneui/themed';
import { StyleSheet } from 'react-native';

// colors:
const colors = {

    primary_bg: "#161d31",
    secondary_bg: "#21415F",
    main_bg: "#111626",

    color: "#b4b7bd",

    primary: "#6759EF",
    secondary: "#21415F",
    success: "#7BFFB1",
    warning: "#ff9f43",
    danger: "#DB253E",
    light: "#f6f6f6",
    dark: "#4b4b4b",

    gray: "#D8D9DD",

    elevated_dark_color: "#283046",
}

const theme = createTheme({
    lightColors: {
        primary: colors.primary,
        background: colors.primary_bg,
        success: colors.success,
        danger: colors.danger,
        elevation: colors.elevated_dark_color,
    },
    darkColors: {
        primary: colors.primary,
        background: colors.primary_bg,
        success: colors.success,
        danger: colors.danger,
        elevation: colors.elevated_dark_color,
    },
    mode: 'dark',
});

const textStyles = StyleSheet.create({
    text: {
        color: 'white',
        fontFamily: 'Rubik-Regular',
    },
    fullName: {
        fontSize: 20,
        color: 'white',
        marginLeft: 10,
        fontFamily: 'Rubik-Regular'
    },
    amount: {
        fontSize: 60,
        color: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        fontFamily: "Rubik-Black",
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Rubik-Bold'
    }
});

const containerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.primary_bg,
    },
    section: {
        flex: 1,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePictureSection: {
        flex: 1,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: colors.primary_bg,
    },
    text: {
        color: 'white',
        fontFamily: 'Rubik-Regular',
    },
    section: {
        flex: 1,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePictureSection: {
        flex: 1,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullName: {
        fontSize: 20,
        marginLeft: 10,
        color: 'white',
        fontFamily: 'Rubik-Regular'
    },
    amount: {
        fontSize: 60,
        color: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        fontFamily: "Rubik-Black",
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginVertical: 10,
        fontFamily: 'Rubik-Bold'
    },
    subtitle: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Rubik-Regular'
    },
});

export { theme, globalStyles, textStyles, containerStyles };