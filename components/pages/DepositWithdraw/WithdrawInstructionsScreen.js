import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, ActivityIndicator, FlatList, KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import QPButton from '../../ui/QPButton';
import { globalStyles } from '../../ui/Theme';
import { getCoinData, sendWithdraw } from '../../../utils/QvaPayClient';

export default function WithdrawInstructionsScreen({ route, navigation }) {

    const { amount, coin } = route.params;
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [coinData, setCoinData] = useState(null);
    const [formData, setFormData] = useState({});

    // useEffect to gte the Coin working_data
    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const response = await getCoinData({ coin_id: coin, navigation });
                setCoinData(response);
                const initialFormData = JSON.parse(response.working_data).reduce((acc, cur) => {
                    acc[cur.name] = '';
                    return acc;
                }, {});
                setFormData(initialFormData);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCoinData();
    }, []);

    const handleInputChange = (name, text) => {
        setFormData(prevState => ({ ...prevState, [name]: text }));
    };

    const renderForm = () => {
        if (!coinData) {
            return null;
        }

        const workingData = JSON.parse(coinData.working_data);

        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <FlatList
                    data={workingData}
                    keyExtractor={(item, index) => `input-${index}`}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.text}>{`${item.name}:`}</Text>
                            <View style={styles.sectionStyle}>
                                <TextInput
                                    autoGrow
                                    style={styles.inputStyle}
                                    onChangeText={text => handleInputChange(item.name, text)}
                                    value={formData[item.name]}
                                />
                            </View>
                        </View>
                    )}
                />
            </KeyboardAvoidingView>
        );
    };

    const handleWithdraw = async () => {
        setSending(true);
        try {
            const { uuid } = await sendWithdraw({ amount, coin: coinData.tick, details: formData, navigation });
            navigation.navigate('TransactionStack', {
                screen: 'ShowTransaction',
                params: { uuid },
            })
        } catch (error) {
            console.error(`Error in withdrawal: ${error}`);
        } finally {
            setSending(false);
        }
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={[globalStyles.container, { justifyContent: 'center', flex: 1 }]} >
            {
                loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    sending ? (
                        <ActivityIndicator size="large" color="#000000" />
                    ) : (
                        <>
                            <Text style={styles.invoiceHeader}>Complete los datos necesarios para completar esta extracción:</Text>

                            <View style={{ flex: 1 }}>
                                {renderForm()}
                            </View>

                            <QPButton title="Extraer Balance" onPress={handleWithdraw} />
                        </>
                    )
                )
            }
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Nunito-Regular',
    },
    invoiceHeader: {
        marginVertical: 16,
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        fontFamily: 'Nunito-Light',
    },
    sectionStyle: {
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        borderColor: '#283046',
        fontFamily: "Nunito-Regular",
    },
})