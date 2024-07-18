import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false)

    return (
        <AuthContext.Provider value={{ isLoginSuccessful, setIsLoginSuccessful }}>
            {children}
        </AuthContext.Provider>
    )
}
