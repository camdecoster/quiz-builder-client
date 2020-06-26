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

            questions: [1, 2, 3],
            date: {
                modified: "2019-01-03T00:00:00.000Z",
            },
        },
        {
            id: 2,
            title: "Directions Quiz",
            description: "Test your knowledge of directions",
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
                low:
                    "Remember, your left hand makes an L when you hold out your pointer finger and thumb.",
                medium: "I think that you're getting your hands confused.",
                high: "I guess you've made some turns in your life.",
                perfect: "I'm following you from here on out!",
            },

            questions: [4, 5, 6, 7],
            date: {
                modified: "2019-01-03T00:00:00.000Z",
            },
        },
    ],
    questions: [
        {
            id: 1,
            question: "What is the capitol of Oregon?",
            answerIndex: 2,
            answers: ["Portland", "Eugene", "Salem", "Corvallis", "Bend"],
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
            answers: ["Colorado"],
            style: {
                image: {
                    url: "",
                    title: "",
                },
            },
        },
        {
            id: 4,
            question: "Which way is up?",
            answerIndex: 0,
            answers: ["Up", "Down", "Left", "Right"],
            style: {
                image: {
                    url: "",
                    title: "",
                },
            },
        },
        {
            id: 5,
            question: "Which way is down?",
            answerIndex: 1,
            answers: ["Up", "Down", "Left", "Right"],
            style: {
                image: {
                    url: "",
                    title: "",
                },
            },
        },
        {
            id: 6,
            question: "Which way is left?",
            answerIndex: 2,
            answers: ["Up", "Down", "Left", "Right"],
            style: {
                image: {
                    url: "",
                    title: "",
                },
            },
        },
        {
            id: 7,
            question: "Which way is right?",
            answerIndex: 3,
            answers: ["Up", "Down", "Left", "Right"],
            style: {
                image: {
                    url: "",
                    title: "",
                },
            },
        },
    ],
};
