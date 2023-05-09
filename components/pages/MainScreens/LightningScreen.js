import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { globalStyles } from '../../ui/Theme'

const prizes = [
    { name: 'Premio 1', probability: 0.1, image: require('../../../assets/images/gold-badge.png') },
    { name: 'Premio 2', probability: 0.2, image: require('../../../assets/images/gold-badge.png') },
    { name: 'Premio 3', probability: 0.3, image: require('../../../assets/images/gold-badge.png') },
    { name: 'Premio 4', probability: 0.4, image: require('../../../assets/images/gold-badge.png') },
];

export default function LightningScreen() {

    const [isSpinning, setIsSpinning] = useState(false);
    const [spinResult, setSpinResult] = useState(null);
    const [nextSpinTime, setNextSpinTime] = useState(null);

    const handleSpin = () => {
        if (!isSpinning && canSpin()) {
            setIsSpinning(true);
            setSpinResult(null);

            // Simular tiempo de giro
            setTimeout(() => {
                const randomAngle = Math.floor(Math.random() * 360);
                const prize = calculatePrize(randomAngle);
                setSpinResult(prize);
                setIsSpinning(false);
                setNextSpinTime(getNextSpinTime());
            }, 3000);
        }
    };

    const canSpin = () => {
        if (!nextSpinTime) {
            return true;
        }

        const currentTime = new Date().getTime();
        return currentTime > nextSpinTime;
    };

    const getNextSpinTime = () => {
        const now = new Date();
        const nextSpin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0); // 12:00 del mediodía y 12:00 de la noche
        if (now.getTime() > nextSpin.getTime()) {
            nextSpin.setDate(nextSpin.getDate() + 1);
        }
        return nextSpin.getTime();
    };

    const calculatePrize = (angle) => {
        let currentProbability = 0;
        for (let i = 0; i < prizes.length; i++) {
            currentProbability += prizes[i].probability;
            if (angle <= currentProbability * 360) {
                return prizes[i];
            }
        }
        return null;
    };

    const renderSpinButton = () => {
        if (isSpinning) {
            return <Text style={styles.button}>Girando...</Text>;
        }

        if (spinResult) {
            return <Text style={styles.button}>{spinResult.name}</Text>;
        }

        if (canSpin()) {
            return (
                <Pressable onPress={handleSpin}>
                    <Text style={styles.button}>¡Gira la Rueda!</Text>
                </Pressable>
            );
        }

        const nextSpin = new Date(nextSpinTime);
        const hours = nextSpin.getHours().toString().padStart(2, '0');
        const minutes = nextSpin.getMinutes().toString().padStart(2, '0');
        return <Text style={styles.button}>Próxima oportunidad: {hours}:{minutes}</Text>;
    };

    return (
        <View style={[globalStyles.container, { alignItems: 'center' }]}>

            <View style={styles.wheel} />

            <View style={styles.bottom}>
                {renderSpinButton()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wheel: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderRadius: 250,
        borderColor: 'white',
        backgroundColor: 'blue',
    },
    bottom: {
        bottom: 0,
        padding: 20,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    button: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})