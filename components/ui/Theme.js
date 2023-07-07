import { createTheme } from '@rneui/themed';
import { StyleSheet } from 'react-native';

// colors:
const colors = {

    primary_bg: "#161d31",
    scondary_bg: "#192034",
    main_bg: "#111626",

    color: "#b4b7bd",

    primary: "#7367f0",
    secondary: "#82868b",
    success: "#28c76f",
    warning: "#ff9f43",
    danger: "#ea5455",
    light: "#f6f6f6",
    dark: "#4b4b4b",

    elevated_dark_color: "#283046",
}

const theme = createTheme({
    lightColors: {
        primary: colors.primary,
        background: colors.primary_bg,
    },
    darkColors: {
        primary: colors.primary,
        background: colors.primary_bg,
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
        paddingHorizontal: 20,
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
        fontSize: 18,
        color: 'white',
        fontFamily: 'Rubik-Bold'
    }
});

export { theme, globalStyles, textStyles, containerStyles };