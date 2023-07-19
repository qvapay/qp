import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from './Theme';

export default function BottomBar({ state, descriptors, navigation }) {

    // Create the nav items array
    const navItems = [
        {
            key: 'Home',
            name: 'home'
        },
        {
            key: 'P2p',
            name: 'users'
        },
        {
            key: 'Keypad',
            name: 'dollar-sign'
        },
        {
            key: 'Lightning',
            name: 'bolt'
        },
        {
            key: 'Store',
            name: 'store'
        },
    ];

    return (
        <View style={styles.BottomNav}>

            {
                // Map for the current defined routes
                state.routes.map((route, index) => {

                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <Pressable
                            key={route.key}
                            accessibilityRole="button"
                            style={styles.pressableArea}
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            <View style={{ flex: 1 }}>
                                <FontAwesome5
                                    name={navItems[index].name}
                                    style={isFocused ? styles.activeTab : styles.fa}
                                />
                            </View>
                        </Pressable>
                    );
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    BottomNav: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: theme.darkColors.background,
        justifyContent: 'space-between',
    },
    pressableArea: {
        flex: 1,
        alignItems: 'center',
    },
    fa: {
        fontSize: 20,
        color: '#505268',
    },
    activeTab: {
        fontSize: 24,
        color: '#fff',
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    blurView: {
        ...StyleSheet.absoluteFillObject,
    },
})