import React, { forwardRef } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from './Theme';

export default QPInput = forwardRef((props, ref) => {

    const { style, multiline } = props;

    // check if the props has a suffix and prefix FontAwesome icons names
    const hasPrefix = props.prefixIconName !== undefined;
    const hasSuffix = props.suffixIconName !== undefined;

    return (
        <View style={styles.container}>

            {hasPrefix && (
                <View style={styles.suffixContainer}>
                    <FontAwesome5 size={18} color="white" name={props.prefixIconName} style={styles.suffixIcon} />
                </View>
            )}

            <TextInput
                ref={ref}
                {...props}
                placeholderStyle={{ fontFamily: 'Rubik-Regular' }}
                placeholderTextColor={theme.darkColors.placeholder}
                style={{ ...styles.input, ...style, height: multiline ? 100 : 50 }}
            />

            {hasSuffix && (
                <View style={styles.suffixContainer}>
                    <FontAwesome5 size={18} color="white" name={props.suffixIconName} style={styles.suffixIcon} />
                </View>
            )}

        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: theme.darkColors.elevation,
    },
    suffixContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        alignContent: 'center',
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
    },
    suffixIcon: {
        marginHorizontal: 10
    },
    input: {
        fontSize: 16,
        width: '100%',
        color: 'white',
        fontFamily: 'Rubik-Regular',
    }
})