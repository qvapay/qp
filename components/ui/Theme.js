import { createTheme } from '@rneui/themed';
import { StyleSheet } from 'react-native';

const theme = createTheme({
    lightColors: {
        primary: '#7367f0',
        background: '#161d31',
    },
    darkColors: {
        primary: '#7367f0',
        background: '#161d31',
    },
    mode: 'dark',
});

const textStyles = StyleSheet.create({
    text: {
        color: 'white',
        fontFamily: 'Nunito-Regular',
    },
    fullName: {
        fontSize: 20,
        color: 'white',
        marginLeft: 10,
        fontFamily: 'Nunito-Regular'
    },
    amount: {
        fontSize: 60,
        color: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        fontFamily: "Nunito-Black",
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Nunito-Bold'
    }
});

const containerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#161d31',
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
        backgroundColor: '#161d31',
    },
    text: {
        color: 'white',
        fontFamily: 'Nunito-Regular',
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
        fontFamily: 'Nunito-Regular'
    },
    amount: {
        fontSize: 60,
        color: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        fontFamily: "Nunito-Black",
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Nunito-Bold'
    }
});

export { theme, globalStyles, textStyles, containerStyles };