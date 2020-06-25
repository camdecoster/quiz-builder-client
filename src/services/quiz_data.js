export default {
    quizzes: [
        {
            id: 1,
            title: "United States Geography Quiz",
            description: "Test your knowledge of the State Capitols",
            style: {
                colors: {
                    background: "black",
                    text: "white",
                },
                image: {
                    url: "",
                    title: "",
                },
            },

            final_message: {
                low: "Time to go back to elementary school.",
                medium: "I guess that capitols song didn't really quite stick.",
                high: "Someone's been looking at maps lately.",
                perfect: "We've got a walking atlas here!",
            },
            questions: [
                {
                    id: 1,
                    question: "What is the capitol of Oregon?",
                    answerIndex: 2,
                    answers: [
                        "Portland",
                        "Eugene",
                        "Salem",
                        "Corvallis",
                        "Bend",
                        "",
                        "",
                        "",
                    ],
                    style: {
                        image: {
                            url: "",
                            title: "",
                        },
                    },
                },
                {
                    id: 2,
                    question: "What is the largest state by area?",
                    answerIndex: 0,
                    answers: [
                        "Alaska",
                        "Texas",
                        "California",
                        "Rhode Island",
                        "New York",
                        "Florida",
                        "Hawaii",
                        "Montana",
                    ],
                    style: {
                        image: {
                            url: "imgurl",
                            title: "Broken Image",
                        },
                    },
                },
                {
                    id: 3,
                    question: "What is the best state?",
                    answerIndex: 0,
                    answers: ["Colorado", "", "", "", "", "", "", ""],
                    style: {
                        image: {
                            url: "",
                            title: "",
                        },
                    },
                },
            ],
            date: {
                created: "2019-01-03T00:00:00.000Z",
                modified: "",
            },
        },
    ],
};
