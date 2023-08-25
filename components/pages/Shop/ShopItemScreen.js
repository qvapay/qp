import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image';
import { getProductByUuid } from '../../../utils/QvaPayClient';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, theme } from '../../ui/Theme';
import QPButton from '../../ui/QPButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import QPTag from '../../ui/QPTag';
import { AppContext } from '../../../AppContext';

const InfoContainer = ({ children, style }) => (
    <View style={[styles.infoContainer, style]}>
        <Text style={styles.infoText}>{children}</Text>
    </View>
)

export default function ShopItemScreen({ route }) {

    const navigation = useNavigation();
    // const { setBackgroundColor } = useContext(AppContext);
    const { uuid } = route.params;
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(0);
    const parsedAmount = parseFloat(amount);
    const [total, setTotal] = useState(0);
    const { name, lead, color = theme.darkColors.background, price, tax = 0.0, desc, meta, category, logo_url, cover_url, price_combos } = product;
    const [parsedPriceCombos, setParsedPriceCombos] = useState([]);
    const [taxText, setTaxText] = useState(`${tax}%`);

    // useEffect to retrive product data from API and set it to product state
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductByUuid({ navigation, uuid });
            if (fetchedProduct) {
                setProduct(fetchedProduct);
                setAmount(parseFloat(fetchedProduct.price));
                try {
                    const combos = JSON.parse(fetchedProduct.price_combos);
                    if (Array.isArray(combos)) {
                        setParsedPriceCombos(combos);
                    } else {
                        console.warn("price_combos parsed but is not an array");
                    }
                } catch (e) {
                    console.error("Failed to parse price_combos:", e);
                }
            }
        };
        fetchProduct();
    }, []);

    // Update total amount when amount changes by amount * tax %
    useEffect(() => {
        let taxPercentage = tax;
        if (parsedAmount >= 5 && parsedAmount < 25) {
            taxPercentage = tax * 2;
        } else if (parsedAmount >= 25 && parsedAmount < 50) {
            taxPercentage = tax * 1.5;
        } else if (parsedAmount >= 50 && parsedAmount < 200) {
            taxPercentage = tax;
        } else if (parsedAmount >= 200 && parsedAmount < 500) {
            taxPercentage = tax * 0.75;
        } else if (parsedAmount >= 500 && parsedAmount < 1000) {
            taxPercentage = tax * 0.625;
        } else if (parsedAmount >= 1000) {
            taxPercentage = tax * 0.5;
        }
        const taxAmount = parsedAmount.toFixed(2) * (taxPercentage / 100);
        const totalAmount = parsedAmount + taxAmount;
        setTotal(totalAmount.toFixed(2));
        setTaxText(`${taxPercentage}%`);
    }, [amount]);

    if (!product) {
        return <Text>Loading...</Text>
    }

    // Parse amount as float
    const increment = () => setAmount(parsedAmount + 1);
    const decrement = () => setAmount(parsedAmount > 1 ? parsedAmount - 1 : 1);

    const handleBuy = () => {
        // Verify the minimal amount is fetchedProduct.price
        if (parsedAmount < parseFloat(price)) {
            alert(`El monto mínimo es de $${price}`);
            return;
        }

        navigation.navigate('ShopCheckoutScreen', {
            uuid,
            value: total,
            amount: parsedAmount,
        });
    }

    // handle go to IndexScreen
    const handleGoBack = () => {
        navigation.navigate('ShopIndexScreen');
    }

    return (
        <View style={styles.container}>

            <ScrollView>

                <View style={[styles.featuredCard, { backgroundColor: color }]}>
                    <Pressable style={styles.backButton} onPress={handleGoBack}>
                        <FontAwesome5 name='arrow-left' size={20} style={styles.faIcon} />
                    </Pressable>
                    <FastImage style={styles.logo} source={{ uri: `${logo_url}` }} resizeMode={FastImage.resizeMode.contain} />
                </View>

                <View style={styles.productData}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <InfoContainer style={{ backgroundColor: theme.darkColors.success }}>{lead}</InfoContainer>
                        <InfoContainer style={{ backgroundColor: theme.darkColors.success }}>{taxText}</InfoContainer>
                    </View>

                    {
                        // If price_combos is defined, map it and render the price combos else render the amount selector
                        parsedPriceCombos.length > 0 ? (
                            <View style={styles.comboSelector}>
                                {
                                    parsedPriceCombos.map((combo, index) => (
                                        <QPTag key={index} onPress={() => setAmount(parseFloat(combo.amount))} title={`${combo.label}`} />
                                    ))
                                }
                            </View>
                        ) : (
                            <View style={styles.amountSelector}>
                                <Pressable onPress={decrement}>
                                    <FontAwesome5 name='minus' size={20} style={styles.counterIcons} />
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
                                    onChangeText={(amount) => {
                                        const number = parseFloat(amount);
                                        if (!isNaN(number)) {
                                            setAmount(number);
                                        }
                                    }}
                                />
                                <Pressable onPress={increment}>
                                    <FontAwesome5 name='plus' size={20} style={styles.counterIcons} />
                                </Pressable>
                            </View>
                        )
                    }

                    <Text style={globalStyles.title}>{name}</Text>
                    <Text style={styles.descText}>{`${desc}`}</Text>
                </View>

            </ScrollView>

            <View style={{ paddingHorizontal: 10, paddingTop: 8 }}>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingHorizontal: 5, alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontFamily: 'Rubik-Regular' }}>A pagar:</Text>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Rubik-Bold' }}>$ {total}</Text>
                </View>

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
        paddingHorizontal: 10,
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
        color: 'black',
        fontFamily: 'Rubik-Bold',
    },
    leadText: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'Rubik-Bold',
    },
    taxText: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'Rubik-ExtraBold',
    },
    descText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Rubik-Regular',
    },
    inputSectionStyle: {
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
    },
    comboSelector: {
        marginVertical: 10,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        borderColor: theme.darkColors.elevation,
        fontFamily: "Rubik-Regular",
    },
    backButton: {
        top: 10,
        left: 10,
        padding: 10,
        position: 'absolute',
    },
    backButtonText: {
        fontSize: 16,
        color: '#000',
    },
    faIcon: {
        color: 'white'
    },
    counterIcons: {
        color: 'white',
        paddingHorizontal: 10,
    },
})