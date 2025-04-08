import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const tokenString = await AsyncStorage.getItem('authToken');
            if (tokenString) {
                const tokenObj = JSON.parse(tokenString);
                config.headers['Authorization'] = `Bearer ${tokenObj.accessToken}`;
            }

        } catch (error) {
            console.error('Error fetching auth token:', error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;