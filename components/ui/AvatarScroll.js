import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AvatarScroll({ navigation }) {

    const [favoriteContacts, setFavoriteContacts] = useState([]);

    // Get contacts from saved contact list on AsyncStorage called 'favoriteContacts'
    // and set them to favoriteContacts state
    useEffect(() => {
        const getFavoriteContacts = async () => {
            const favoriteContacts = await AsyncStorage.getItem('favoriteContacts');
            if (favoriteContacts) {
                setFavoriteContacts(JSON.parse(favoriteContacts));
            }
        }
        getFavoriteContacts();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {favoriteContacts.map((contact) => (
                    <Pressable key={contact.uuid} style={styles.contact} onPress={() => console.log(contact)}>
                        <Text style={styles.name}>{contact.name}</Text>
                        <Image source={contact.profile_photo_url} style={styles.image} />
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    contact: {
        width: 70,
        marginRight: 10,
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: 'white',
    },
    name: {
        fontSize: 12,
        marginTop: 4,
        color: '#fff',
        textAlign: 'center',
        fontFamily: "Nunito-Light",
    },
})