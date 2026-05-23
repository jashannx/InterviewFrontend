import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "./auth.api";
export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser()
                setUser(data.user)
            } catch (error) {
                console.error("Failed to fetch user:", error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};