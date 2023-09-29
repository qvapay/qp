import React, { forwardRef, useState } from 'react'
import { StyleSheet, View, TextInput, Pressable } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from './Theme';

export default QPInput = forwardRef((props, ref) => {

    const { style, multiline } = props
    const hasPrefix = props.prefixIconName !== undefined
    const hasSuffix = props.suffixIconName !== undefined

    const [isSecure, setIsSecure] = useState(props.secureTextEntry)
    const [suffixIconName, setSuffixIconName] = useState(props.suffixIconName)

    // Change the TextInput between password and text
    const handleSuffixPress = () => {
        if (props.suffixIconName === 'eye' || props.suffixIconName === 'eye-slash') {
            setIsSecure(!isSecure);
            setSuffixIconName(isSecure ? 'eye' : 'eye-slash');
        }
    }

    return (
        <View style={styles.container}>

            {
                hasPrefix && (
                    <View style={styles.prefixContainer}>
                        <FontAwesome5 size={18} color="white" name={props.prefixIconName} style={styles.suffixIcon} />
                    </View>
                )
            }

            <TextInput
                ref={ref}
                {...props}
                secureTextEntry={isSecure}
                placeholderStyle={{ fontFamily: 'Rubik-Regular' }}
                placeholderTextColor={theme.darkColors.placeholder}
                style={{ ...styles.input, ...style, height: multiline ? 100 : 50 }}
            />

            {
                hasSuffix && (
                    <Pressable onPress={handleSuffixPress}>
                        <View style={styles.suffixContainer}>
                            <FontAwesome5 size={18} color="white" name={suffixIconName} style={styles.suffixIcon} />
                        </View>
                    </Pressable>
                )
            }

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
        justifyContent: 'space-between',
        backgroundColor: theme.darkColors.elevation,
    },
    prefixContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        alignContent: 'center',
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
    },
    suffixContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    suffixIcon: {
        marginHorizontal: 10
    },
    input: {
        // flex: 1,
        fontSize: 16,
        width: '100%',
        color: 'white',
        fontFamily: 'Rubik-Regular',
    }
})