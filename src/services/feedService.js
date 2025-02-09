import axiosInstance from "../utils/axiosInstance";
import dummyFeeds from "../dummies/dummyFeeds";

export const fetchHomeFeeds = async (page) => {
    // const token = localStorage.getItem("token");
    // try {
    //     const response = await axiosInstance.get(`/feeds/home?page=${page}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         }
    //     });
    //     return response.data;
    // } catch (error) {
    //     console.log("로그인 오류: ", error);
    //     throw error;
    // }

    return new Promise((resolve) => {
        setTimeout(() => {
            const startIndex = (page - 1) * 20;
            const endIndex = startIndex + 20;
            const feeds = dummyFeeds.slice(startIndex, endIndex);
            resolve({
                feeds,
                hasNext: endIndex < dummyFeeds.length,
            });
        }, 1000);
    });
};
