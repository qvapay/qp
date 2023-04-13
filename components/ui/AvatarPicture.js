import React, { useContext } from 'react'
import { Avatar } from '@rneui/base';
import { StyleSheet, View } from 'react-native'
import { AppContext } from '../../AppContext';

export default function AvatarPicture({ size = 32, source_uri = '' }) {

    // if source_uri is '', use me from AppContext
    const { me } = useContext(AppContext);
    if (source_uri === '') {
        console.log(me)
        source_uri = me.profile_photo_url;
    }

    // Dynamic borderWidth based on size
    const borderWidth = size / 30;

    return (
        <View>
            <Avatar
                rounded
                size={size}
                avatarStyle={[styles.avatarStyle, { borderWidth }]}
                source={{ uri: source_uri }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    avatarStyle: {
        borderColor: 'white',
    },
})