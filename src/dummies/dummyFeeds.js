const getRandomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split("T")[0];
}

const dummyFeeds = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    profileImage: "https://randomuser.me/api/portraits/thumb/men/" + (i % 10) + ".jpg",
    userId: `user_${i + 1}`,
    nickname: `사용자 ${i + 1}`,
    timestamp: getRandomDate(),
    text: `이것은 피드 ${i + 1}의\n 본문 내용입니다.\n반갑습니다! 🎉`.repeat((i % 3) + 1),
    images: (i % 3 === 0)
        ? ["http://localhost:3000/images/feedImage/image1.jpg"]
        : (i % 3 === 1)
            ? ["http://localhost:3000/images/feedImage/image1.jpg", "http://localhost:3000/images/feedImage/image3.jpg"]
            : [],
    likeCount: Math.floor(Math.random() * 100),
    commentCount: Math.floor(Math.random() * 50),
    liked: Math.random() > 0.5,
    isMine: Math.random() > 0.8
}));

export default dummyFeeds;