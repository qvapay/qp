import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native'
import QPButton from '../../ui/QPButton';
import { globalStyles } from '../../ui/Theme';
import { getCoinData } from '../../../utils/QvaPayClient';

export default function WithdrawInstructionsScreen({ route, navigation }) {

    const { amount, coin } = route.params;
    const [loading, setLoading] = useState(true);
    const [coinData, setCoinData] = useState(null);
    const [formData, setFormData] = useState({});

    // useEffect to gte the Coin working_data
    useEffect(() => {
        const fetchCoinData = async () => {

            try {
                const response = await getCoinData({ coin_id: coin, navigation });
                setCoinData(response);

                // Initialize formData with keys from working_data
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
        return workingData.map((item, index) => (
            <View key={index}>
                <Text>{item.name}:</Text>
                <View style={styles.sectionStyle}>
                    <TextInput
                        autoGrow
                        multiline={true}
                        numberOfLines={2}
                        style={styles.inputStyle}
                        onChangeText={text => handleInputChange(item.name, text)}
                        value={formData[item.name]}
                    />
                </View>
            </View>
        ));
    };

    const handleWithdraw = () => {

        console.log(amount)
        console.log(coinData)
        console.log(formData);

    };

    return (
        <View style={globalStyles.container}>
            {
                loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Text style={styles.invoiceHeader}>Complete los datos necesarios para compeltar esta extraccion:</Text>

                        <View style={{ flex: 1 }}>
                            {renderForm()}
                        </View>

                        <QPButton title="Extraer Balance" onPress={handleWithdraw} />
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    invoiceHeader: {
        marginVertical: 16,
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        fontFamily: 'Nunito-Light',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingLeft: 10,
    },
    sectionStyle: {
        height: 60,
        marginTop: 10,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        borderColor: '#283046',
        fontFamily: "Nunito-Regular",
        maxHeight: 100,
    },
})