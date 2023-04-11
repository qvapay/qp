import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    // User State
    const [user, setUser] = useState({ balance: 0, profile_photo_url: "https://media.qvapay.com/profiles/MoLdQFHZ0V0EWZnrgVFVO0DCU7JX9N7imbhMU63u.jpg" });

    const value = {
        user,
        setUser
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};