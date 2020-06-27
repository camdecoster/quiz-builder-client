export default {
    quizzes: [
        {
            id: 1,
            title: "United States Geography Quiz",
            author: "Quiz Quizzington",
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
            author: "Quiz Quizzington",
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
                    url:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Oregon.svg/320px-Flag_of_Oregon.svg.png",
                    title: "flag of oregon",
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
                    url:
                        "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/320px-Flag_of_the_United_States.svg.png",
                    title: "flag of united states",
                },
            },
        },
        {
            id: 3,
            question: "What is capitol of Colorado?",
            answerIndex: 3,
            answers: [
                "Boulder",
                "Fort Collins",
                "Colorado Springs",
                "Denver",
                "Grand Junction",
            ],
            style: {
                image: {
                    url:
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colorado_designed_by_Andrew_Carlisle_Carson.svg/320px-Flag_of_Colorado_designed_by_Andrew_Carlisle_Carson.svg.png",
                    title: "flag of colorado",
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
