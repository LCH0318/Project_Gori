import React, { useState } from "react";
import styles from "../../css/feeds/SquadCalendar.module.css";

const SquadCalendar = ({ isOpen, onClose, onSelect, currentDate }) => {
    // const nowDate = toDate()

    const today = new Date();
    const maxSelectableDate = new Date();
    maxSelectableDate.setDate(today.getDate() + 29);

    const [currentMonth, setCurrentMonth] = useState(today);
    const [selectedDate, setSelectedDate] = useState(currentDate);

    if (!isOpen) return null;

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateSelect = (date) => {
        if (date < today || date > maxSelectableDate) return;
        setSelectedDate(date);
        onSelect(date);
    };

    const generateCalendar = () => {
        const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
        const lastDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

        let days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= lastDate; i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            days.push(date);
        }
        return days;
    };

    return (
        <div
            className={styles["calendar-modal-overlay"]}
            onClick={onClose}>
            <div
                className={styles["calendar-modal"]}
                onClick={(e) => e.stopPropagation()}>
                <div className={styles["calendar-header"]}>
                    <button onClick={handlePrevMonth}><img />&lt;</button>
                    <span>{currentMonth.toLocaleString("ko-KR", { month: "long", year: "numeric" })}</span>
                    <button onClick={handleNextMonth}><img />&gt;</button>
                </div>
                <div className={styles["calendar-grid"]}>
                    {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                        <div
                            key={day}
                            className={`${styles["calendar-day-header"]}}`}>
                            {day}
                        </div>
                    ))}
                    {generateCalendar().map((date, index) => {
                        if (!date) {
                            return <div key={index} className={styles["empty"]}></div>;
                        }

                        const isToday = date.toDateString() === today.toDateString();
                        const isPast = date < today;
                        const isFutureLimited = date > maxSelectableDate;
                        const isSunday = date.getDay() === 0;
                        const isSaturday = date.getDay() === 6;
                        const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                        return (
                            <div
                                key={index}
                                className={`
                                    ${styles["calendar-day"]}
                                    ${isToday ? styles["today"] : ""}
                                    ${isPast || isFutureLimited ? styles["disabled"] : ""}
                                    ${!(isPast || isFutureLimited) && isSunday ? styles["sunday"] : ""}
                                    ${!(isPast || isFutureLimited) && isSaturday ? styles["saturday"] : ""}
                                    ${isSelected ? styles["selected"] : ""}
                                `}
                                onClick={() => date && handleDateSelect(date)}>
                                {date.getDate()}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default SquadCalendar;