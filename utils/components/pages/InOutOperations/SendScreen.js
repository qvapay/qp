import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native';
import { PermissionsAndroid, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import Contacts from 'react-native-contacts';
import AvatarScroll from '../../ui/AvatarScroll';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function SendScreen({ route, navigation }) {

    const [text, setText] = useState('');
    const [contacts, setContacts] = useState([]);
    const [amount, setAmount] = useState(route.params.amount);

    // Check if amount has no decimals and if not, add .00
    useEffect(() => {
        if (!amount.includes('.')) {
            setAmount(amount + '.00');
        }
    }, [amount]);

    // Try to read contacts, so ask for a permission
    useEffect(() => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
            }).then(() => {
                loadContacts();
            });
        } else {
            loadContacts();
        }
    }, []);

    // Load Contact List
    const loadContacts = () => {
        Contacts.getAll()
            .then(contacts => {
                setContacts(contacts);
            })
            .catch(e => {
                console.log(e)
                alert('Permission to access contacts was denied...');
                console.warn('Permission to access contacts was denied');
            });
    };

    // Search inside contacts
    const search = (text) => {

        // set Text
        setText(text);

        // If text is empty, load all contacts
        if (text === '') {
            loadContacts();
            return;
        }

        Contacts.getContactsMatchingString(text)
            .then(contacts => {
                setContacts(contacts);
            })
            .catch(e => {
                console.log(e)
                alert('Permission to access contacts was denied...');
                console.warn('Permission to access contacts was denied');
            });
    };

    // Validar si el valor proporcionado es un correo electrónico
    const isEmail = (text) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regex.test(text);
    };

    // Validar si el valor proporcionado es un número de teléfono
    const isPhoneNumber = (text) => {
        const regex = /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/;
        return regex.test(text);
    };

    // Go to ConfirmSendScreen
    const handleSendMoney = () => {
        // Comprueba si se ha seleccionado un contacto o si 'text' es un correo electrónico,
        // número de teléfono o nombre de usuario válido
        if (
            isEmail(text) ||
            isPhoneNumber(text) ||
            (text !== '' && text.trim().length >= 3) // Asume que un nombre de usuario válido tiene al menos 3 caracteres
        ) {
            const destination = text;
            navigation.navigate('ConfirmSendScreen', {
                amount,
                destination
            });
        } else {
            // Si no cumple con las condiciones, muestra un mensaje de error
            Alert.alert(
                'Error',
                'Por favor, seleccione un contacto o ingrese un correo electrónico, número de teléfono o nombre de usuario válido en el buscador.'
            );
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.sendingAmountContainer}>
                <Text style={styles.sendingLabel}>Enviando...</Text>
                <Text style={styles.amount}>$ {amount}</Text>
            </View>

            <View style={styles.sendingContactContainer}>

                <View key={'fastDestinationSelector'} style={styles.avatarScroll}>
                    <AvatarScroll navigation={navigation} />
                </View>

                <View style={styles.searchBar}>
                    <FontAwesome5 name='search' size={12} color='#7f8c8d' />
                    <TextInput
                        onChangeText={search}
                        placeholder="Buscar"
                        placeholderTextColor="#7f8c8d"
                        style={styles.searchBarText}
                    />
                </View>

                <View key={'destinationContactList'}>
                    <FlatList
                        data={contacts}
                        keyExtractor={(item) => item.recordID}
                        renderItem={({ item }) => (
                            <View style={styles.contactView}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../../assets/images/contact.jpg')} style={styles.image} />
                                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: 5 }}>
                                        <Text style={styles.contactName}>{item.displayName}</Text>
                                        <Text style={styles.contactNumber}>
                                            {item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>

            <View style={{ backgroundColor: '#161d31' }}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={handleSendMoney}>
                    <Text style={styles.buttonTextStyle}>ENVIAR ${amount}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: '#161d31',
    },
    sendingAmountContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendingContactContainer: {
        flex: 6,
        justifyContent: 'flex-start',
    },
    sendingLabel: {
        alignSelf: 'center',
        fontSize: 13,
        color: '#fff',
        fontFamily: "Nunito-Regular",
    },
    amount: {
        fontSize: 30,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: "Nunito-Black",
    },
    contactPickerContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonStyle: {
        height: 40,
        borderWidth: 0,
        color: '#FFFFFF',
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: '#7367f0',
    },
    avatarScroll: {
    },
    buttonTextStyle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        paddingVertical: 10,
        fontFamily: "Nunito-Regular",
    },
    searchBar: {
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    searchBarText: {
        height: 40,
        fontSize: 14,
        color: '#7f8c8d',
        paddingVertical: 0,
        paddingHorizontal: 10,
        fontFamily: "Nunito-Regular",
    },
    contactView: {
        paddingVertical: 5,
        marginVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    contactName: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Nunito-Regular",
    },
    contactNumber: {
        fontSize: 14,
        color: '#7f8c8d',
        fontFamily: "Nunito-Light",
    },
    image: {
        width: 30,
        height: 30,
        borderWidth: 1,
        marginRight: 15,
        borderRadius: 15,
        borderColor: 'white',
    },
})