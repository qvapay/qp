import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, TextInput } from 'react-native'
import { getMyPurchases } from '../../../utils/QvaPayClient';
import { globalStyles } from '../../ui/Theme';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../ui/Theme';
import FastImage from 'react-native-fast-image';
import { getShortDateTime } from '../../../utils/Helpers';
import { HeaderBackButton } from '@react-navigation/elements';

export default function MyPurchasesScreen() {

    const navigation = useNavigation();
    const [myPurchases, setMyPurchases] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

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

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={myPurchases}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                        <View style={styles.item}>
                            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                <FastImage
                                    style={styles.imageLogo}
                                    source={{ uri: `${item.service.logo_url}` }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.itemTitle}>Actualizado:</Text>
                                    <Text style={styles.itemDescription}>{getShortDateTime(item.created_at)}</Text>

                                    <Text style={styles.itemTitle}>Status:</Text>
                                    <Text style={styles.itemDescription}>{item.status}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.itemTitle}>{item.service.name}</Text>
                                <Text style={styles.itemPrice}>${item.transaction?.amount}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
            />

            {selectedItem && (
                <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={closeModal}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }} onPress={closeModal} activeOpacity={1}>
                        <View style={{ width: '80%', backgroundColor: theme.darkColors.elevation, padding: 20, borderRadius: 10 }}>
                            <TextInput
                                value={selectedItem.service_data}
                                style={[styles.itemTitle, { padding: 0, margin: 0 }]}
                                editable={false}
                                multiline
                                underlineColorAndroid="transparent"
                                selectTextOnFocus
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    imageLogo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: theme.darkColors.elevation,
    },
    itemTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Rubik-Regular',
    },
    itemDescription: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Rubik-Regular',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Rubik-Regular',
        color: theme.darkColors.success,
    },
})