import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:4000/api/auth',
    withCredentials: true
})
export async function registerUser(username, email, password) {
    try {
        const response = await api.post('/register', {
            username,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}
export async function loginUser(email, password) {
    try {
        const response = await api.post('/login', {  
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export async function logoutUser() {
    try {
        const response = await api.get('/logout');
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
}
export async function getCurrentUser() {
    try {
        const response = await api.get('/verify');
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
}
