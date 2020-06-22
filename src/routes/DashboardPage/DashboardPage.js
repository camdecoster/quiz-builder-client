// React
import React, { useState, useEffect, useContext } from "react";

// Configuration
import "./DashboardPage.css";
import TrackerContext from "../../contexts/TrackerContext";
import { firstLetterUppercase } from "../../js-utilities";

// Components
import RandomQuizSection from "../../components/RandomQuizSection/RandomQuizSection";

export default function DashboardPage() {
    // Access context
    const context = useContext(TrackerContext);
    const { dateCurrent = new Date() } = context;

    // Initialize state
    const [dateSelected, setDateSelected] = useState(new Date(dateCurrent));
    const [dateString, setDateString] = useState(
        `${dateSelected.toLocaleString("default", {
            month: "long",
        })} ${dateSelected.getFullYear()}`
    );
    const [spendingInterval, setSpendingInterval] = useState("month");

    const [categoryTotals, setCategoryTotals] = useState([]);
    const [payment_methodTotals, setPayment_methodTotals] = useState([]);

    // Update date string after selection changes
    useEffect(() => {
        setDateString(
            `${dateSelected.toLocaleString("default", {
                month: "long",
            })} ${dateSelected.getFullYear()}`
        );
    }, [dateSelected]);

    function shiftCurrentDateByMonths(months) {
        const tempDate = new Date(dateCurrent);
        tempDate.setMonth(tempDate.getMonth() + months);
        return tempDate;
    }

    function getShiftedDateString(prefixString, months) {
        return `${prefixString} (${shiftCurrentDateByMonths(
            months
        ).toLocaleString("default", {
            month: "long",
        })} ${shiftCurrentDateByMonths(months).getFullYear()})`;
    }

    return (
        <section id='DashboardPage' className='route_page'>
            <header role='banner'>
                <h1>Welcome to Quiz Builder</h1>
            </header>
            <section>
                <h3>Your Quizzes</h3>
            </section>
            <RandomQuizSection />
        </section>
    );
}
