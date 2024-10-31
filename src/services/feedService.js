import axiosInstance from "../../utils/axiosInstance";

export const fetchFeeds = async (page) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axiosInstance.get(`/api/feeds?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log("로그인 오류: ", error);
        throw error;
    }
};
