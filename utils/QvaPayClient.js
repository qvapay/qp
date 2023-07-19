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

        // Network Error do nothing or 
        if (error.request && !error.response) {
            onNetworkError(navigation);
            return null;
        }

        if (error.response && error.response.status === 401) {
            onInvalidToken(navigation);
            return null;
        }

        if (error.response && error.response.status === 422) {
            onInvalidResponse(navigation);
            return null;
        }

        // If none is matched, the go away
        onInvalidNavigation(navigation);

        throw error;
    }
}

// Borra accessToken y redirege a SplashScreen
const onInvalidToken = async (navigation) => {
    try {
        await EncryptedStorage.removeItem('accessToken');
    } catch (error) {
        console.error("onInvalidToken:" + error);
    }
    navigation.replace('AuthStack');
};

// Borra accessToken y redirege a SplashScreen
const onInvalidResponse = async (navigation) => {
    navigation.goBack();
};

// Go to Splash Screen
const onInvalidNavigation = async (navigation) => {
    navigation.replace("SplashScreen");
};

// Network error
const onNetworkError = (navigation) => {
    console.error("Network error: No internet connection.");
}

// Check the 2FA token and code, return true or false based on response token
const checkTwoFactor = async ({ twofactorcode, navigation }) => {
    try {
        const url = `/auth/two-factor`;
        const data = { code: twofactorcode };
        const response = await apiRequest(url, { method: 'POST', data }, navigation);
        return response;
    } catch (error) { console.error(error) }
};

// GetMe Function for the me State
const getMe = async (navigation) => {
    try {
        const response = await apiRequest('/user', { method: 'GET' }, navigation);
        return response;
    } catch (error) { console.error(error) }
};

// get all transactions from the user
const getTransactions = async ({ description = '', status = "paid", limit = 5, navigation }) => {
    try {
        const url = `/transactions?status=${status}&amount=${limit}&description=${description}`;
        const response = await apiRequest(url, { method: 'GET' }, navigation);
        return response;
    } catch (error) { console.error(error) }
};

// get specific transaction based on its uuid
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
        if (response && response.user) {
            return response;
        } else {
            throw new Error("User not found or invalid response");
        }
    } catch (error) {
        console.error(error);
        return { error: true, message: error.message };
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

// Send a message to a P2P offer
// uuid is the P2P offer
const sendP2pMessage = async ({ uuid, text, navigation }) => {
    try {
        const url = `/p2p/${uuid}/msg`
        const response = await apiRequest(url, { method: 'POST', data: { text } }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
}

// Get All available coins:
const getCoins = async ({ navigation }) => {
    try {
        const url = `/coins`
        const response = await apiRequest(url, { method: 'GET' }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
};

// Get the Coin data:
const getCoinData = async ({ coin_id, navigation }) => {
    try {
        const url = `/coins/${coin_id}`
        const response = await apiRequest(url, { method: 'GET' }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
};

// Get a TOPUP Wallet from a coin
const getTopUpData = async ({ amount, coin, navigation }) => {
    try {
        const url = `/topup`
        const response = await apiRequest(url, { method: 'POST', data: { amount, pay_method: coin } }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
};

// Send Withdraw data
const sendWithdraw = async ({ amount, coin, details, navigation }) => {
    try {
        const url = `/withdraw`
        const data = { amount, pay_method: coin, details }
        const response = await apiRequest(url, { method: 'POST', data }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
};

// Buy or extend the Gold Check status
const buyGoldCheck = async ({ navigation }) => {
    try {
        const url = `/gold`
        const data = { csrf: 'csrf' }
        const response = await apiRequest(url, { method: 'POST', data }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
};

const updateUserData = async ({ navigation, data }) => {
    try {
        const url = `/user`
        const response = await apiRequest(url, { method: 'PUT', data }, navigation);
        return response;
    } catch (error) {
        console.error(error);
    }
};

const getProducts = async ({ navigation }) => {
    try {
        const response = await apiRequest('/store', { method: 'GET' }, navigation);
        return response;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// get the product Data from API
const getProductByUuid = async ({ navigation, uuid }) => {
    try {
        const url = `/store/${uuid}`
        const response = await apiRequest(url, { method: 'GET' }, navigation);
        return response;
    } catch (error) {
        console.error('Error fetching product:', error);
        return [];
    }
};

// Send the buy product/service to the API
const buyProduct = async ({ navigation, uuid, amount, value }) => {
    try {
        const url = `/store/buy`
        const data = { amount, value, uuid }
        const response = await apiRequest(url, { method: 'POST', data }, navigation);
        return response;
    } catch (error) {
        console.error('Error buying product:', error);
        return [];
    }
};

export {
    qvaPayClient,
    checkTwoFactor,
    transferBalance,
    getTransaction,
    getTransactions,
    getMe,
    checkUser,
    getP2POffers,
    getP2POffer,
    applyP2POffer,
    sendP2pMessage,
    getCoins,
    getTopUpData,
    getCoinData,
    sendWithdraw,
    buyGoldCheck,
    updateUserData,
    getProducts,
    getProductByUuid,
    buyProduct
};