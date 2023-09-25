import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Pressable } from 'react-native'
import { getMyPurchases } from '../../../utils/QvaPayClient';
import { globalStyles, textStyles } from '../../ui/Theme';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../ui/Theme';
import FastImage from 'react-native-fast-image';
import { getShortDateTime, timeAgo } from '../../../utils/Helpers';
import { HeaderBackButton } from '@react-navigation/elements';
import Modal from "react-native-modal";

import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';

export default function MyPurchasesScreen() {

    const navigation = useNavigation();
    const [myPurchases, setMyPurchases] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [itemData, setItemData] = useState({});
    const [confirmation, setConfirmation] = useState([]);

    // useEffect fopr fetching the data
    useEffect(() => {
        const fetchMyPurchases = async () => {
            try {
                const myPurchasesResponse = await getMyPurchases({ navigation });
                if (myPurchasesResponse?.data?.length > 0) {
                    setMyPurchases(myPurchasesResponse.data);
                } else {
                    setMyPurchases([]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchMyPurchases();
    }, []);

    // Add the bulb icon to right side of the top bar
    useEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            ),
        });
    }, [navigation]);

    // Clic on a item to show the modal data
    const handleItemPress = (item) => {
        const itemDataJson = JSON.parse(item.service_data);
        setItemData(itemDataJson)
        setSelectedItem(item)
        setModalVisible(true)
    };

    // Toggle Modal Visibility
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Copy text data to clipboard
    const copyTextToClipboard = (text) => {
        Clipboard.setString(text)
        console.log(text)
        Toast.show({
            type: 'success',
            text1: 'Elemento copiado al portapapeles',
            position: 'top',
        });
    };


    return (
        <View style={globalStyles.container}>

            <Text style={textStyles.h1}>Mis compras:</Text>

            <FlatList
                data={myPurchases}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                        <View style={styles.item}>
                            <FastImage
                                style={styles.imageLogo}
                                source={{ uri: `${item.service.logo_url}` }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            <View style={{ flex: 1, marginLeft: 80, marginVertical: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={styles.itemTitle}>{item.service.name}</Text>
                                    <Text style={styles.itemDescription}>{item.status}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                    <Text style={textStyles.smallDescription}>Hace {timeAgo(item.updated_at)}</Text>
                                    <Text style={styles.itemPrice}>${item.transaction?.amount}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
            />

            {
                selectedItem && (

                    <Modal
                        isVisible={isModalVisible}
                        animationIn={'slideInUp'}
                        onBackdropPress={() => setModalVisible(false)}
                        onSwipeComplete={() => setModalVisible(false)}
                        swipeDirection={['down']}
                        style={styles.modalview}
                    >
                        <View style={{ backgroundColor: theme.darkColors.elevation, padding: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>

                            <View style={globalStyles.modalTopBar}></View>

                            {
                                Object.keys(itemData).map((key, index) => (
                                    <View key={index} style={{ marginVertical: 5 }}>
                                        <Text style={textStyles.smallDescription}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                                        <TextInput
                                            value={itemData[key]}
                                            style={styles.itemDescription}
                                            editable={false}
                                            multiline
                                            underlineColorAndroid="transparent"
                                            selectTextOnFocus
                                        />
                                    </View>
                                ))

                            }

                            <View style={{ marginVertical: 5 }}>
                                <Text style={textStyles.smallDescription}>Actualizado:</Text>
                                <Text style={styles.itemDescription}>{getShortDateTime(selectedItem.created_at)}</Text>
                            </View>
                        </View>
                    </Modal>
                )
            }

        </View >
    )
}

const styles = StyleSheet.create({
    imageLogo: {
        width: 100,
        height: 100,
        left: -20,
        bottom: -20,
        alignSelf: 'center',
        position: 'absolute',
        resizeMode: 'contain',
    },
    item: {
        borderRadius: 10,
        paddingRight: 10,
        marginVertical: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.darkColors.elevation,
    },
    itemTitle: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Rubik-Regular',
    },
    modalItemTitle: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Rubik-Medium',
    },
    itemDescription: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Rubik-Regular',
    },
    itemPrice: {
        fontSize: 16,
        alignSelf: 'flex-end',
        fontFamily: 'Rubik-SemiBold',
        color: theme.darkColors.success,
    },
    modalview: {
        margin: 0,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
})