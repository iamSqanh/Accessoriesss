import { mapTokens } from '@/redux/actions/userAction';
import store from '@/redux/store';
import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_DEVELOPMENT_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().user.accessToken;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response) {
            if (
                (err.response.status === 401 || err.response.status === 403) &&
                !originalConfig._retry
            ) {
                originalConfig._retry = true;
                try {
                    const res = await instance.post('/auth/user/refresh', {
                        'x-refresh-token': store.getState().user.refreshToken,
                    });
                    const { accessToken, refreshToken } = res.data;
                    store.dispatch(mapTokens(accessToken, refreshToken));
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    },
);

export default instance;