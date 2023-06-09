import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    
    const [me, setMe] = useState({ balance: 0, satoshis: 0, profile_photo_url: "https://qvapay.com/android-chrome-192x192.png" });

    const value = { me, setMe };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};