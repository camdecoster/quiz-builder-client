import React from "react";

const TrackerContext = React.createContext({
    categories: null,
    dateCurrent: null,
    expenses: null,
    payment_methods: null,
    setCategories: () => {},
    setClassNames: () => {},
    setExpenses: () => {},
    setPayment_methods: () => {},
    toggleClassNames: () => {},
});

export default TrackerContext;
