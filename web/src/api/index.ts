import axios from "axios";
import Cookies from "js-cookie";

const AxiosApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    timeout: 0,
    headers: {
        Authorization: `Bearer ${Cookies.get(import.meta.env.VITE_API_KEY_NAME)}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

AxiosApi.interceptors.request.use(
    (config) => {
        console.log("Request made with config: ", config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

AxiosApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === "ECONNABORTED") {
            console.error("Request timeout, please try again later.");
        }
        return Promise.reject(error);
    },
);

export default AxiosApi;
