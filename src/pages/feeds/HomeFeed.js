import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import FeedItem from "../../components/feed/FeedItem";
import { fetchHomeFeeds } from "../../services/feedService";
import styles from "../../css/feeds/HomeFeed.module.css"
import FeedItem from "../../components/feed/FeedItem";
import EditDeleteModel from "../../components/common/EditDeleteModel";
import ConfirmDeleteModel from "../../components/common/ConfirmDeleteModel";

const HomeFeed = () => {
    const navigate = useNavigate();
    const [feeds, setFeeds] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const [loading, setLoading] = useState(false);
    const observer = useRef();
    const pageRef = useRef(page);

    const [isEditDeleteModalOpen, setIsEditDeleteModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [selecetedFeed, setSelectedFeed] = useState(null);

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

    const openManageModal = (feed) => {
        setSelectedFeed(feed);
        setIsEditDeleteModalOpen(true);
    }

    const closeEditDeleteModal = () => {
        setIsEditDeleteModalOpen(false);
        setSelectedFeed(null);
    }

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false);
        setSelectedFeed(null);
    }

    const handleEdit = () => {
        setIsEditDeleteModalOpen(false);
        // alert(`수정 ${selecetedFeed?.text}`);
        if (selecetedFeed) {
            navigate(`/feed/edit/${selecetedFeed?.id}`);
        }
    };

    const handleOpenDelete = () => {
        // alert(`삭제 ${selecetedFeed.text}`);
        setIsEditDeleteModalOpen(false);
        setIsConfirmDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        alert(`${selecetedFeed?.id} 게시글 삭제`);
        setFeeds(feeds.filter(feed => feed.id !== selecetedFeed.id));
        setIsConfirmDeleteModalOpen(false);
        setSelectedFeed(null);
    }

    const handleCancelDelete = () => {
        setIsEditDeleteModalOpen(true);
        setIsConfirmDeleteModalOpen(false);
    }

    return (
        <>
            <div className={styles["feed-list"]}>
                {feeds.map((feed, index) => (
                    <FeedItem
                        key={`feed-${feed.id}`}
                        feed={feed}
                        onManageClick={() => openManageModal(feed)}
                        ref={index === feeds.length - 1 ? lastFeedRef : null} />
                ))}
                {loading && <p className={styles["loading-text"]}>로딩 중...</p>}
            </div>
            <EditDeleteModel
                isOpen={isEditDeleteModalOpen}
                onClose={closeEditDeleteModal}
                onEdit={handleEdit}
                onDelete={handleOpenDelete}
            />
            <ConfirmDeleteModel
                isOpen={isConfirmDeleteModalOpen}
                onClose={closeConfirmDeleteModal}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
};

export default HomeFeed;