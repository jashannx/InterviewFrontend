import { useContext } from "react";
import { AuthContext } from "../services/auth.context";

import { registerUser ,loginUser,logoutUser} from "../services/auth.api";

function getErrorMessage(error, fallbackMessage) {
    return error?.response?.data?.error || fallbackMessage;
}

export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext)
    
    const handleLogin = async (email, password) => {
        setLoading(true)
        try {
            const data = await loginUser(email, password)
            setUser(data.user)
            return { success: true, error: null }
        } catch (error) {
            console.error("Login failed:", error)
            return {
                success: false,
                error: getErrorMessage(error, "Login failed. Please try again.")
            }
        }
        finally {
            setLoading(false)
        }
    }   

    const handleRegister = async (username, email, password) => {
        setLoading(true)
        try {
            const data = await registerUser(username, email, password)
            setUser(data.user)
            return { success: true, error: null }
        } catch (error) {
            console.error("Registration failed:", error)
            return {
                success: false,
                error: getErrorMessage(error, "Registration failed. Please try again.")
            }
        }
        finally {
            setLoading(false)
        }
    }
    const handleLogout = async () => {
        setLoading(true)
        try {
            await logoutUser()
            setUser(null)
            return { success: true, error: null }
        } catch (error) {
            console.error("Logout failed:", error)
            return {
                success: false,
                error: getErrorMessage(error, "Logout failed. Please try again.")
            }
        }
        finally {
            setLoading(false)
        }
    }
    return { user, loading, handleLogin, handleRegister, handleLogout }
    
}
