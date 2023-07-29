import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const defaultMe = {
        balance: 0,
        satoshis: 0,
        phone_verified: 0,
        profile_photo_url: "https://qvapay.com/android-chrome-192x192.png"
    };

    const [me, setMe] = useState(defaultMe);

    const value = { me, setMe };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};