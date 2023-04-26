import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";

/**
 * QvaPay SDK from https://documenter.getpostman.com/view/8765260/TzzHnDGw
 */

// Create the Axios Client
const qvaPayClient = axios.create({
    baseURL: "https://qvapay.com/api",
    headers: {
        "Content-Type": "application/json",
        "X-QvaPay-Client": "QvaPayClient",
        "User-Agent": "QvaPayClient",
        "X-QvaPay-Client-Version": "1.0.0",
        "X-QvaPay-Client-Platform": "QvaPayClient",
        "X-QvaPay-Client-Platform-Version": "1.0.0",
    },
});

// Create a generic function to make every request to the API
const apiRequest = async (url, options = {}, navigation) => {

    const accessToken = await EncryptedStorage.getItem("accessToken");

    // Check if accessToken !exists
    if (!accessToken) {
        onInvalidToken(navigation);
        return null;
    }

    console.log("apiRequest: " + accessToken)

    try {

        const response = await qvaPayClient.request({
            url,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                ...options.headers
            },
            ...options
        });

        // Verifica si el token no es válido
        if (response.status === 401) {
            onInvalidToken(navigation);
            return null;
        }

        // Verifica si el token no es válido
        if (response.status === 422) {
            onInvalidResponse(navigation);
            return null;
        }

        return response.data;

    } catch (error) {

        console.error("Error1: " + error);

        if (error.response && error.response.status === 401) {
            onInvalidToken(navigation);
            return null;
        }

        if (error.response && error.response.status === 422) {
            onInvalidResponse(navigation);
            return null;
        }

        // If none is matched, the go away
        onInvalidToken(navigation);

        throw error;
    }
}

// Borra accessToken y redirege a SplashScreen
const onInvalidToken = async (navigation) => {
    try {
        await EncryptedStorage.removeItem('accessToken');
    } catch (error) { }
    navigation.replace('AuthStack');
};

// Borra accessToken y redirege a SplashScreen
const onInvalidResponse = async (navigation) => {
    navigation.goBack();
};

// GetMe Function for the me State
const getMe = async (navigation) => {
    try {
        const response = await apiRequest('/user', { method: 'GET' }, navigation);
        return response;
    } catch (error) { console.error(error); }
};

// get all transactions from the user
const getTransactions = async ({ description = '', status = "paid", limit = 5, navigation }) => {
    try {
        const url = `/transactions?status=${status}&amount=${limit}&description=${description}`;
        console.log(url)
        const response = await apiRequest(url, { method: 'GET' }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
};

// get all transactions from the user
const getTransaction = async ({ uuid, navigation }) => {
    try {
        const response = await apiRequest(`/transactions/${uuid}`, { method: 'GET' }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
};

// Check for the existence of a user
const checkUser = async ({ to, navigation }) => {
    try {
        const response = await apiRequest('/transactions/check', { method: 'POST', data: { to } }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
};

// transfer balance between users
const transferBalance = async (to, amount, description) => {

    const accessToken = await EncryptedStorage.getItem("accessToken");
    const data = { to, amount, description, notify: true };

    try {
        const response = await qvaPayClient.post("/transactions/transfer", data, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.data && response.data.uuid) {
            return response;
        } else {
            throw new Error("No se pudo transferir correctamente");
        }
    } catch (error) {
        console.error(error.response);
        return error.response;
    }
};

// Get P2P Offers
const getP2POffers = async ({ type = 'buy', coin = '', navigation }) => {
    try {
        const url = `/p2p/index?type=${type}`
        const response = await apiRequest(url, { method: 'GET' }, navigation);
        return response.data;   // This is a second 'data' object inside the response
    } catch (error) {
        console.error(error);
    }
}

// Get an specific order
const getP2POffer = async ({ uuid, navigation }) => {
    try {
        const url = `/p2p/${uuid}`
        const response = await apiRequest(url, { method: 'GET' }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
}

const applyP2POffer = async ({ uuid, navigation }) => {
    try {
        const url = `/p2p/${uuid}/apply`
        const response = await apiRequest(url, { method: 'POST' }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export {
    qvaPayClient,
    transferBalance,
    getTransaction,
    getTransactions,
    getMe,
    checkUser,
    getP2POffers,
    getP2POffer,
    applyP2POffer
};