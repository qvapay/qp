import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Pressable, Image, FlatList } from 'react-native';

export default function CommentSticker({ setComment }) {

    const [tab, setTab] = useState('comment');
    const [selectedSticker, setSelectedSticker] = useState(null);

    const stickers = [
        { id: 1, image: require('../../assets/images/qvapay-cover.png') },
    ];

    const renderSticker = ({ item }) => (
        <Pressable onPress={() => setSelectedSticker(item)}>
            <Image source={item.image} style={{ width: 50, height: 50 }} />
        </Pressable>
    );

    return (
        <View style={styles.container}>

            <View style={styles.tabContainer}>
                <Pressable onPress={() => setTab('comment')}>
                    <Text style={[styles.tabText, { fontWeight: tab === 'comment' ? 'bold' : 'normal' }]}>Comentario</Text>
                </Pressable>
                <Pressable onPress={() => setTab('sticker')}>
                    <Text style={[styles.tabText, { fontWeight: tab === 'sticker' ? 'bold' : 'normal' }]}>Stickers</Text>
                </Pressable>
            </View>

            {tab === 'comment' ? (
                <View style={styles.commentBar}>
                    <TextInput
                        multiline={true}
                        style={styles.comment}
                        onChangeText={setComment}
                        placeholder="Escribe un comentario..."
                        placeholderTextColor="#7f8c8d"
                    />
                </View>
            ) : (
                <FlatList data={stickers} renderItem={renderSticker} numColumns={3} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        marginVertical: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    tabText: {
        color: '#fff',
        fontFamily: 'Rubik-Regular',
    },
    commentBar: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: theme.darkColors.elevation,
        marginBottom: 10,
    },
    comment: {
        fontSize: 16,
        color: 'white',
        fontFamily: "Rubik-Regular",
    },
})