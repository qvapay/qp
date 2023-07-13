import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
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
    const { name, lead, color, price, tax, desc, meta, category, logo_url, cover_url } = product;

    // useEffect to retrive product data from API and set it to product state
    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductByUuid({ navigation, uuid });
            if (fetchedProduct) {
                setProduct(fetchedProduct);
            }
        };
        fetchProduct();
    }, []);

    if (!product) {
        return <Text>Loading...</Text> // o algún componente de carga que te guste
    }

    const increment = () => setAmount(amount + 1);
    const decrement = () => setAmount(amount > 1 ? amount - 1 : 1);

    return (
        <View style={globalStyles.container}>
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
                    {/* <Text style={globalStyles.subtitle}>{category}</Text> */}
                </View>

            </ScrollView>

            <QPButton title="Comprar" />

        </View>
    )
}

const styles = StyleSheet.create({
    featuredCard: {
        height: 150,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: '50%',
        height: '90%',
        position: 'absolute',
    },
    productData: {
        flex: 1,
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
        borderColor: '#283046',
        fontFamily: "Rubik-Regular",
    },
})