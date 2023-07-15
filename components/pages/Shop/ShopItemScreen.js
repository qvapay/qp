import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable, StatusBar } from 'react-native'
import FastImage from 'react-native-fast-image';
import { getProductByUuid } from '../../../utils/QvaPayClient';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, theme } from '../../ui/Theme';
import QPButton from '../../ui/QPButton';

const InfoContainer = ({ children, style }) => (
    <View style={[styles.infoContainer, style]}>
        <Text style={styles.infoText}>{children}</Text>
    </View>
)

export default function ShopItemScreen({ route }) {

    // navigation hook
    const navigation = useNavigation();

    const { uuid } = route.params;
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(1);
    const { name, lead, color = theme.darkColors.background, price, tax, desc, meta, category, logo_url, cover_url } = product;

    // useEffect to retrive product data from API and set it to product state
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductByUuid({ navigation, uuid });
            if (fetchedProduct) {
                setProduct(fetchedProduct);
                setAmount(fetchedProduct.price);
            }
        };
        fetchProduct();
    }, []);

    // Set the ShopItemScreen heade background color to color variable and no shadow
    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: color,
            },
        });
    }, [color]);

    // Set the notification bar color to color variable
    useEffect(() => {
        StatusBar.setBackgroundColor(color);
    }, [color]);

    if (!product) {
        return <Text>Loading...</Text>
    }

    // Parse amount as float
    const parsedAmount = parseFloat(amount);
    const increment = () => setAmount(parsedAmount + 1);
    const decrement = () => setAmount(parsedAmount > 1 ? parsedAmount - 1 : 1);

    const handleBuy = () => {
        navigation.navigate('ShopCheckoutScreen', {
            uuid,
            amount: parsedAmount,
        });
    }

    return (
        <View style={styles.container}>

            <ScrollView>

                <View style={[styles.featuredCard, { backgroundColor: color }]}>
                    <FastImage
                        style={styles.logo}
                        source={{ uri: `${logo_url}` }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>

                <View style={styles.productData}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <InfoContainer style={{ backgroundColor: theme.darkColors.success }}>{lead}</InfoContainer>
                        <InfoContainer style={{ backgroundColor: theme.darkColors.success }}>{`${tax}%`}</InfoContainer>
                    </View>

                    <View style={styles.amountSelector}>

                        <Pressable onPress={decrement}>
                            <Text style={globalStyles.subtitle}>-</Text>
                        </Pressable>

                        <TextInput
                            style={styles.inputStyle}
                            placeholder="$0.00"
                            value={`${amount}`}
                            placeholderTextColor="#7f8c8d"
                            keyboardType="numeric"
                            returnKeyType="next"
                            autoCapitalize="none"
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                            onChangeText={(amount) => setAmount(amount)}
                        />

                        <Pressable onPress={increment}>
                            <Text style={globalStyles.subtitle}>+</Text>
                        </Pressable>

                    </View>

                    <Text style={globalStyles.title}>{name}</Text>
                    <Text style={styles.descText}>{`${desc}`}</Text>
                </View>

            </ScrollView>

            <View style={{ paddingHorizontal: 10 }}>
                <QPButton title="Comprar" onPress={handleBuy} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.darkColors.background,
    },
    featuredCard: {
        height: 200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: '50%',
        height: '100%',
        position: 'absolute',
    },
    productData: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 20,
    },
    buyBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    infoContainer: {
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    infoText: {
        fontSize: 13,
        color: '#fff',
        fontFamily: 'Rubik-Bold',
    },
    leadText: {
        fontSize: 13,
        color: '#fff',
        fontFamily: 'Rubik-Bold',
    },
    taxText: {
        fontSize: 13,
        color: '#fff',
        fontFamily: 'Rubik-ExtraBold',
    },
    descText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Rubik-Regular',
    },
    inputSectionStyle: {
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
    },
    amountSelector: {
        marginVertical: 10,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputStyle: {
        flex: 1,
        height: 50,
        fontSize: 20,
        color: 'white',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        textAlign: 'center',
        borderColor: '#283046',
        fontFamily: "Rubik-Regular",
    },
})