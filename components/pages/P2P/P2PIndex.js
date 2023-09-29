import React, { useState } from 'react'
import { View } from 'react-native'
import Modal from "react-native-modal";
import { globalStyles } from '../../ui/Theme';
import { useNavigation } from '@react-navigation/native'

export default function P2PIndex() {

    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View style={globalStyles.container}>

            {/** P2P Offers Index */}

            {
                isModalVisible && (
                    <Modal>
                        <View style={globalStyles.container}>
                            <Text>Hello!</Text>
                        </View>
                    </Modal>
                )
            }

        </View>
    );
}