import React, { useState, useEffect, useRef, useCallback } from "react";
// import FeedItem from "../../components/feed/FeedItem";
import { fetchHomeFeeds } from "../../services/feedService";
import styles from "../../css/feeds/HomeFeed.module.css"
import FeedItem from "../../components/feed/FeedItem";

const HomeFeed = () => {
    const [feeds, setFeeds] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);
    const observer = useRef();
    const pageRef = useRef(page);

    useEffect(() => {
        pageRef.current = page;
    }, [page]);

    const loadMoreFeeds = async () => {
        if (!hasNext || loading) return;
        setLoading(true);

        try {
            console.log("page : " + page);
            const data = await fetchHomeFeeds(page);
            setFeeds(prevFeeds => [...prevFeeds, ...data.feeds]);
            setHasNext(data.hasNext);
            console.log("loaded: " + page);
        } catch (error) {
            console.log("피드 불러오기 오류:", error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMoreFeeds();
    }, [page]);

    const lastFeedRef = useCallback((node) => {
        if (loading || !hasNext) return;
        if (observer.current) observer.current.disconnect();
        // viewport

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNext) {

                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasNext]);

    return (
        <div className={styles["feed-list"]}>
            {feeds.map((feed, index) => (
                <FeedItem key={`feed-${feed.id}`} feed={feed} ref={index === feeds.length - 1 ? lastFeedRef : null} />
            ))}
            {loading && <p className={styles["loading-text"]}>로딩 중...</p>}
        </div>
    );
};

export default HomeFeed;