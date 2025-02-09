import axiosInstance from "../utils/axiosInstance";

export const login = async (email, providerId, provider) => {
    try {
        const response = await axiosInstance.post("/api/auth/signin", {
            email,
            provider,
            providerId
        });
        return response.data;
    } catch (error) {
        console.log("로그인 오류: ", error);
        throw error;
    }
};
