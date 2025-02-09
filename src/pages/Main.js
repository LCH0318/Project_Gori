import React, { useEffect, useState } from "react";
// import Header from "../components/home_header/Header";
import BottomNavigation from "../components/footer/BottomNavigation/BottomNavigation";
import Session from "../components/Session";
import HomeHeader from "../components/home_header/HomeHeader";
import CategoryList from "./common/CategoryList";
import HomeFeed from "./feeds/HomeFeed";
import CheckBox from "../components/common/CheckBox";
import styles from "../css/Main.module.css";
import RegionBottomSheet from "../components/feed/bottomsheets/RegionBottomSheet";
import axios from 'axios';

const Main = () => {

    const [squadActive, setSquadActive] = useState(false);
    const [isRegionMainSheetOpen, setIsRegionMainSheetOpen] = useState(false);
    const [isRegionSubSheetOpen, setIsRegionSubSheetOpen] = useState(false);
    const [selectedRegionMain, setSelectedRegionMain] = useState("");
    const [selectedRegionSub, setSelectedRegionSub] = useState(null);
    const [catagory, setCataGory] = useState("");

    const regionMains = ["서울", "경기", "부산", "대구", "광주"];
    const regionSubs = {
        "서울": ["전체", "강남구", "강동구", "관악구", "광진구", "구로구"],
        "경기": ["전체", "성남시", "수원시", "고양시", "용인시"],
        "부산": ["전체", "해운대구", "부산진구", "동래구"],
        "대구": ["전체", "달서구", "수성구", "중구"],
        "광주": ["전체", "동구", "서구", "북구"]
    };

    const openRegionMainSheet = () => setIsRegionMainSheetOpen(true);
    const closeRegionMainSheet = () => setIsRegionMainSheetOpen(false);


    const openRegionSubSheet = () => {
        setIsRegionSubSheetOpen(true);
    };
    const closeRegionSubSheet = () => {
        setIsRegionSubSheetOpen(false);

        if (selectedRegionSub === "") {
            setSelectedRegionMain("");
        }
    };

    const handleRegionMainConfirm = () => {
        closeRegionMainSheet();
        openRegionSubSheet();
    };

    const handleRegionSubConfirm = () => {
        closeRegionSubSheet();
        console.log(selectedRegionMain, selectedRegionSub);
        setLocationButtonTxt(selectedRegionMain + " " + selectedRegionSub);
    }

    const [locationButtonTxt, setLocationButtonTxt] = useState("지역으로 찾기");

    const updateButton = (newData) => {
        setLocationButtonTxt(newData);
    }

    const clearBtn = () => {
        setLocationButtonTxt("지역으로 찾기");
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("https://gory.seojongchan-dev.com/api/feed/home");
            setCataGory(res.data.catagory);
        }
    })

    return (
        <>
            <HomeHeader />
            <Session />
            <CategoryList />
            <div className={styles["locationButton"]}>
                <button onClick={openRegionMainSheet}>
                    <img src="/images/location.png"></img>
                    {locationButtonTxt}
                    {locationButtonTxt !== '지역으로 찾기' ? <img src="/images/locationClearBtn.png" onClick={() => { clearBtn() }} /> : ""}
                </button>
                <div>
                    <CheckBox setVal={() => setSquadActive(true)} checked={squadActive} text="모집 중만 보기" />
                </div>
            </div>
            <HomeFeed />
            <RegionBottomSheet
                isOpen={isRegionMainSheetOpen}
                title="어디서 모일까요"
                items={regionMains}
                selectedItem={selectedRegionMain}
                onSelect={setSelectedRegionMain}
                onClose={closeRegionMainSheet}
                onConfirm={handleRegionMainConfirm}
            />
            <RegionBottomSheet
                isOpen={isRegionSubSheetOpen}
                title="상세 지역도 선택해주세요"
                items={regionSubs[selectedRegionMain] || []}
                selectedItem={selectedRegionSub}
                onSelect={setSelectedRegionSub}
                onClose={closeRegionSubSheet}
                onConfirm={handleRegionSubConfirm}
            />

            <BottomNavigation />
        </>
    );
}

export default Main;