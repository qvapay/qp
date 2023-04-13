import AsyncStorage from '@react-native-async-storage/async-storage';

// Store the Model on async storage
const storeData = async (key, value) => {
    try {

        console.log('storeData', key, value);

        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

// Get the Model from async storage
const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

// Remove the Model from async storage
const removeValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        // remove error
    }
}

export { storeData, getData, removeValue };