export default {
    categories: [
        {
            id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
            name: "Auto",
            // type: "monthly",
            amount: {
                monthly: "120",
                quarterly: "-",
                yearly: "-",
            },
            description:
                "All car related expenses: gas, maintenance, insurance, etc.",
        },
        {
            id: "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
            name: "Groceries",
            amount: {
                monthly: "400",
                quarterly: "-",
                yearly: "-",
            },
            description: "Grocery expenses, including alcohol",
        },
        {
            id: "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
            name: "Shopping",
            type: "monthly",
            amount: {
                monthly: "250",
                quarterly: "-",
                yearly: "-",
            },
            description:
                "General shopping expenses that don't fit in another category",
        },
        {
            id: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
            name: "HOA",
            amount: {
                monthly: "-",
                quarterly: "80",
                yearly: "-",
            },
            description: "Quarterly HOA dues",
        },
        {
            id: "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
            name: "Memberships",
            amount: {
                monthly: "-",
                quarterly: "-",
                yearly: "500",
            },
            description:
                "Expenses related to memberships at museums, zoos, Amazon Prime, etc.",
        },
    ],
    expenses: [
        {
            id: "d26e01a6-ffaf-11e8-8eb2-f2801f1b9fd1",
            date: "2020-04-15T23:00:00.000Z",
            type: "Expense",
            amount: "15",
            payee: "Netflix",
            category: "Shopping",
            method: "Visa",
            description: "Streaming video subscription",
        },
        {
            id: "d26e0570-ffaf-11e8-8eb2-f2801f1b9fd1",
            date: "2020-04-17T23:00:00.000Z",
            type: "Expense",
            amount: "20",
            payee: "Gas Station",
            category: "Auto",
            method: "Check",
            description: "Gas for car",
        },
        {
            id: "d26e0714-ffaf-11e8-8eb2-f2801f1b9fd1",
            date: "2020-04-19T23:00:00.000Z",
            type: "Credit",
            amount: "5",
            payee: "King Soopers",
            category: "Groceries",
            method: "Cash",
            description: "",
        },
    ],
    methods: [
        {
            id: "d26e0854-ffaf-11e8-8eb2-f2801f1b9fd1",
            name: "Visa",
            cycle_type: "Offset",
            cycle_start: "5",
            cycle_end: "4",
            description: "Visa credit card",
        },
        {
            id: "d26e0980-ffaf-11e8-8eb2-f2801f1b9fd1",
            name: "Cash",
            cycle_type: "Monthly",
            cycle_start: "-",
            cycle_end: "-",
            description: "Straight cash, yo",
        },
        {
            id: "d26e0aac-ffaf-11e8-8eb2-f2801f1b9fd1",
            name: "Check",
            cycle_type: "Monthly",
            cycle_start: "-",
            cycle_end: "-",
            description: "Checks that I write",
        },
    ],
    month: {
        spendingData: [
            {
                category: "Auto",
                expenses: 200,
                budget: 500,
                remain: 300,
            },
            {
                category: "Food",
                expenses: 400,
                budget: 500,
                remain: 100,
            },
            {
                category: "Home",
                expenses: 1000,
                budget: 1200,
                remain: 200,
            },
            {
                category: "Pets",
                expenses: 50,
                budget: 100,
                remain: 50,
            },
        ],
        paymentMethodData: [
            {
                paymentMethod: "Visa",
                expenses: 1450,
                cycle: "04/05 to 05/04",
            },
            {
                paymentMethod: "AmEx",
                expenses: 850,
                cycle: "04/09 to 05/08",
            },
            {
                paymentMethod: "Cash",
                expenses: 650,
                cycle: "04/01 to 04/30",
            },
            {
                paymentMethod: "Check",
                expenses: 250,
                cycle: "04/01 to 04/30",
            },
        ],
    },

    quarter: {
        spendingData: [
            {
                category: "Auto",
                expenses: 600,
                budget: 1500,
                remain: 900,
            },
            {
                category: "Food",
                expenses: 1200,
                budget: 1500,
                remain: 300,
            },
            {
                category: "Home",
                expenses: 3000,
                budget: 3600,
                remain: 600,
            },
            {
                category: "Pets",
                expenses: 150,
                budget: 300,
                remain: 150,
            },
        ],
        paymentMethodData: [
            {
                paymentMethod: "Visa",
                expenses: 4350,
                cycle: "-",
            },
            {
                paymentMethod: "AmEx",
                expenses: 2550,
                cycle: "-",
            },
            {
                paymentMethod: "Cash",
                expenses: 1950,
                cycle: "-",
            },
            {
                paymentMethod: "Check",
                expenses: 750,
                cycle: "-",
            },
        ],
    },

    year: {
        spendingData: [
            {
                category: "Auto",
                expenses: 2400,
                budget: 6000,
                remain: 3600,
            },
            {
                category: "Food",
                expenses: 4800,
                budget: 6000,
                remain: 1200,
            },
            {
                category: "Home",
                expenses: 12000,
                budget: 14400,
                remain: 2400,
            },
            {
                category: "Pets",
                expenses: 600,
                budget: 1200,
                remain: 600,
            },
        ],
        paymentMethodData: [
            {
                paymentMethod: "Visa",
                expenses: 17400,
                cycle: "-",
            },
            {
                paymentMethod: "AmEx",
                expenses: 7650,
                cycle: "-",
            },
            {
                paymentMethod: "Cash",
                expenses: 5850,
                cycle: "-",
            },
            {
                paymentMethod: "Check",
                expenses: 2250,
                cycle: "-",
            },
        ],
    },
};
