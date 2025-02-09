import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.SPRING_SERVER_API_URL || "https://gory.seojongchandev.com/api",
    headers: {
        "Content-Type": "application/json"
    },
});

export default axiosInstance;