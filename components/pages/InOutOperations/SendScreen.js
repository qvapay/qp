import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Alert } from 'react-native'
import QPButton from '../../ui/QPButton';
import AvatarScroll from '../../ui/AvatarScroll';
import AvatarPicture from '../../ui/AvatarPicture';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkUser } from '../../../utils/QvaPayClient';

// Theme
import { theme } from '../../ui/Theme';

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

    // Load LOCAL contacts (not phone contacts but AsyncStorage Contacts)
    const loadContacts = async () => {
        const contacts = await AsyncStorage.getItem('contacts');
        if (contacts) {
            setContacts(JSON.parse(contacts));
        }
    };

    // Load contacts on mount
    useEffect(() => {
        loadContacts();
    }, []);

    // search for contacts on text change
    const search = (text) => {
        setText(text);
    }

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
    const handleSendMoney = async ({ uuid = '' }) => {

        let destination = '';

        if (isEmail(text) || isPhoneNumber(text) || (text !== '' && text.trim().length >= 3)) {
            destination = text;
        } else if (uuid !== '') {
            destination = contacts.find((contact) => contact.uuid === uuid);
        } else {
            Alert.alert(
                'Error',
                'Por favor, seleccione un contacto o ingrese un correo electrónico, número de teléfono o nombre de usuario válido en el buscador.'
            );
            return;
        }

        // Surronud with try catch
        try {
            const response = await checkUser({ to: destination, navigation });
            if (response.user) {
                navigation.navigate('ConfirmSendScreen', { amount, destination });
            } else {
                Alert.alert(
                    'Error',
                    'El usuario no existe'
                );
            }
        } catch (error) {
            console.log(error);
            Alert.alert(
                'Error',
                'El usuario no existe'
            );
            return;
        }

    };

    // Extract item View for a more clean code
    const itemView = ({ item }) => {
        return (
            <Pressable onPress={() => { handleSendMoney(item) }} >
                <View style={styles.contactView}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.contactAvatar}>
                            <AvatarPicture source_uri={item.source_uri} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 5 }}>
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text style={styles.contactNumber}>{item.username}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
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
                        placeholder="Correo o username de destino"
                        placeholderTextColor="#7f8c8d"
                        style={styles.searchBarText}
                    />
                </View>

                <View key={'destinationContactList'}>
                    <FlatList
                        data={contacts}
                        keyExtractor={(item) => item.uuid}
                        renderItem={({ item }) => itemView({ item })}
                    />
                </View>
            </View>

            <QPButton title={`ENVIAR \$${amount}`} onPress={handleSendMoney} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: theme.darkColors.background,
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
        fontFamily: "Rubik-Regular",
    },
    amount: {
        fontSize: 30,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: "Rubik-Black",
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
        backgroundColor: theme.darkColors.primary,
    },
    buttonTextStyle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        paddingVertical: 10,
        fontFamily: "Rubik-Regular",
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
        textTransform: 'none',
        paddingHorizontal: 10,
        fontFamily: "Rubik-Regular",
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
        fontFamily: "Rubik-Regular",
    },
    contactNumber: {
        fontSize: 14,
        color: '#7f8c8d',
        fontFamily: "Rubik-Medium",
    },
    contactAvatar: {
        marginRight: 10
    },
})