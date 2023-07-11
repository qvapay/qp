import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// {
//     "uuid": "0f3c9429-db89-4493-931c-fa959c9652cf",
//     "name": "Saldo mÃ³vil ETECSA",
//     "lead": "$ 250 CUP",
//     "color": "darker",
//     "price": "28.00",
//     "tax": "0.00",
//     "desc": "Tarjeta de dÃ©bito VISA por el valor indicado. Esta es una tarjeta virtual emitida y funcional en cualquier comercio online de los EEUU. \r\nSÃ³lo vÃ¡lida en el territorio de los Estados Unidos de AmÃ©rica. \r\nLeer los tÃ©rminos y condiciones del uso y responsabilidades con esta tarjeta para evitar bloqueos o cancelaciones.\r\nEn prÃ³ximas actualizaciones se agregarÃ¡n nuevos montos y nuevas caracterÃ­sticas.",
//     "meta": "[{\"html_name\": \"name\",\"html_type\": \"text\",\"html_label\": \"Nombre y Apellidos\",\"html_value\": \"Nombre y Apellidos\"}]",
//     "featured": 0,
//     "category": null,
//     "logo_url": "/services/recarga.png",
//     "cover_url": "/services/k90XAybRh4CNFDm1hO3eYwZAQ3bbmUuiOvn9OCGb.png"
//   }

export default function FeaturedCard({ product }) {

    const navigation = useNavigation();

    const { uuid, name, lead, color, price, tax, desc, meta, category, logo_url, cover_url } = product;
    const [circlePos, setCirclePos] = React.useState({
        circle1: { top: 0, left: 0 },
        circle2: { bottom: 0, right: 0 },
        circle3: { bottom: 0, right: 0 },
    });

    React.useEffect(() => {
        setCirclePos({
            circle1: { top: `${Math.random() * 40 - 30}%`, left: `${Math.random() * 40 - 30}%` },
            circle2: { bottom: `${Math.random() * 40 - 20}%`, right: `${Math.random() * 40 - 20}%` },
            circle3: { bottom: `${Math.random() * 60 - 40}%`, right: `${Math.random() * 60 - 40}%` },
        });
    }, []);

    // handlePress on card
    const handlePress = () => {
        navigation.navigate('ProductScreen', { product });
    }

    return (
        <View style={styles.cardContainer}>
            <View style={[styles.featuredCard, { backgroundColor: color }]}>

                <View style={[styles.circle1, circlePos.circle1]} />
                <View style={[styles.circle2, circlePos.circle2]} />
                <View style={[styles.circle3, circlePos.circle3]} />

                <FastImage
                    style={styles.logo}
                    source={{ uri: `${logo_url}` }}
                    resizeMode={FastImage.resizeMode.contain}
                />

                <View style={{ flex: 1 }} />

                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)']} style={styles.bottomInfo}>
                    <Text style={styles.bottomNameText}>{name}</Text>
                    <Text style={styles.bottomPriceText}>{lead}</Text>
                </LinearGradient>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        height: 150,
        borderRadius: 10,
        marginHorizontal: 5,
        overflow: 'hidden',
    },
    featuredCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        width: '50%',
        height: '90%',
        position: 'absolute',
    },
    patternOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
    pattern: {
        width: '100%',
        height: '100%',
    },
    bottomInfo: {
        width: '100%',
        paddingVertical: 6,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomNameText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Rubik-Regular'
    },
    bottomPriceText: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Rubik-Bold'
    },
    circle1: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150, // Este número puede variar dependiendo de las dimensiones exactas de tus círculos
        backgroundColor: 'white',
        opacity: 0.06,
        left: '-30%',
        top: '-30%',
        zIndex: 1,
    },
    circle2: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150, // Este número puede variar dependiendo de las dimensiones exactas de tus círculos
        backgroundColor: 'white',
        opacity: 0.07,
        right: '-20%',
        bottom: '-20%',
        zIndex: 1,
    },
    circle3: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100, // Este número puede variar dependiendo de las dimensiones exactas de tus círculos
        backgroundColor: 'white',
        opacity: 0.08,
        right: '-40%',
        bottom: '-40%',
        zIndex: 1,
    },
});