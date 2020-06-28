// Configuration
import config from "../config";
import TokenService from "./token-service";
import quizData from "./quiz_data";
import quiz_data from "./quiz_data";

const QuizApiService = {
    async deleteQuiz(id) {
        // try {
        //     const res = await fetch(`${config.API_ENDPOINT}/quizzes/${id}`, {
        //         method: "DELETE",
        //         headers: {
        //             "content-type": "application/json",
        //             Authorization: `bearer ${TokenService.getAuthToken()}`,
        //         },
        //     });

        //     // If response was bad, throw error
        //     if (!res.ok) {
        //         const response = await res.json();
        //         throw new Error(
        //             response.error.message ||
        //                 "There was an error deleting the quiz"
        //         );
        //     }

        //     // No response content will be provided, so just pass response
        //     return res;
        // } catch (error) {
        //     throw new Error(error.message);
        // }
        return Promise.resolve(true);
    },
    // Make this endpoint open to public?
    async getQuizzes() {
        // try {
        //     const res = await fetch(`${config.API_ENDPOINT}/quizzes`, {
        //         headers: {
        //             Authorization: `bearer ${TokenService.getAuthToken()}`,
        //         },
        //     });
        //     // If response was bad, throw error
        //     if (!res.ok) {
        //         const response = await res.json();
        //         throw new Error(
        //             response.error.message ||
        //                 "There was an error getting the quizzes"
        //         );
        //     }
        //     return await res.json();
        // } catch (error) {
        //     throw new Error(error.message);
        // }
        const newQuizzes = JSON.parse(JSON.stringify(quizData.quizzes));

        const mergedQuizzes = [];

        newQuizzes.forEach((quiz) => {
            const questions = [];
            quiz.questions.forEach((id, index) => {
                // questions starts as just question ID's. Replace ID's with questions.
                questions.push(
                    quizData.questions.filter((q) => q.id === id)[0]
                );
            });

            quiz.questions = [...questions];
            mergedQuizzes.push(quiz);
        });
        console.log(mergedQuizzes);

        return Promise.resolve(JSON.parse(JSON.stringify(mergedQuizzes)));
    },
    // Make this endpoint open to public?
    async getQuiz(quizId) {
        // try {const res = await fetch(`${config.API_ENDPOINT}/quizzes/${quizId}`, {
        //     headers: {
        //         authorization: `bearer ${TokenService.getAuthToken()}`,
        //     },
        // });

        // // If response was bad, throw error
        // if (!res.ok) {
        //     const response = await res.json();
        //     throw new Error(
        //         response.error.message || "There was an error getting the quiz"
        //     );
        // }

        //     return await res.json();
        // } catch (error) {
        //     throw new Error(error.message);
        // }
        const quiz = JSON.parse(
            JSON.stringify(
                quizData.quizzes.filter((quiz) => quiz.id === quizId)[0]
            )
        );

        const questions = [];
        quiz.questions.forEach((id, index) => {
            // questions starts as just question ID's. Replace ID's with questions.
            questions.push(quizData.questions.filter((q) => q.id === id)[0]);
        });

        quiz.questions = [...questions];

        return Promise.resolve({
            quiz: JSON.parse(JSON.stringify(quiz)),
        });
    },
    // This will eventually need to be async
    getRandomQuizId() {
        // MAGIC RANDOM QUIZ LOGIC PLACEHOLDER
        const id = Math.round(
            Math.random() * (quiz_data.quizzes.length - 1) + 1
        );
        return id;
    },
    async postQuiz(quiz) {
        // try {
        //     const res = await fetch(`${config.API_ENDPOINT}/quizzes`, {
        //         method: "POST",
        //         headers: {
        //             "content-type": "application/json",
        //             authorization: `bearer ${TokenService.getAuthToken()}`,
        //         },
        //         body: JSON.stringify(quiz),
        //     });

        //     // If response was bad, throw error
        //     if (!res.ok) {
        //         const response = await res.json();
        //         throw new Error(
        //             response.error.message ||
        //                 "There was an error creating the quiz"
        //         );
        //     }

        //     return {
        //         quiz: await res.json(),
        //         path: res.headers.get("Location"),
        //     };
        // } catch (error) {
        //     throw new Error(error.message);
        // }
        quiz.id = new Date().getTime();
        return { quiz: quiz };
    },
    async updateQuiz(quiz) {
        // try {
        //     const res = await fetch(
        //         `${config.API_ENDPOINT}/quizzes/${quiz.id}`,
        //         {
        //             method: "PATCH",
        //             headers: {
        //                 "content-type": "application/json",
        //                 Authorization: `bearer ${TokenService.getAuthToken()}`,
        //             },
        //             body: JSON.stringify(quiz),
        //         }
        //     );

        //     // If response was bad, throw error
        //     if (!res.ok) {
        //         const response = await res.json();
        //         throw new Error(
        //             response.error.message ||
        //                 "There was an error updating the quiz"
        //         );
        //     }

        //     // No response content will be provided, so just pass response
        //     return res;
        // } catch (error) {
        //     throw new Error(error.message);
        // }
        return Promise.resolve(true);
    },
};

export default QuizApiService;
