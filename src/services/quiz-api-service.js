// Configuration
import config from "../config";
import TokenService from "./token-service";
import quizData from "./quiz_data";

const QuizApiService = {
    async deleteQuiz(id) {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/quizzes/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: `bearer ${TokenService.getAuthToken()}`,
                },
            });

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error deleting the quiz"
                );
            }

            // No response content will be provided, so just pass response
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
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
        return Promise.resolve(quizData.quizzes);
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
        // console.log("ID is", quizId);
        // console.log(quizData.quizzes.filter((quiz) => quiz.id === quizId)[0]);
        return Promise.resolve({
            quiz: quizData.quizzes.filter((quiz) => quiz.id === quizId)[0],
        });
    },
    async postQuiz(quiz) {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/quizzes`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${TokenService.getAuthToken()}`,
                },
                body: JSON.stringify(quiz),
            });

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error creating the quiz"
                );
            }

            return {
                quiz: await res.json(),
                path: res.headers.get("Location"),
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async updateQuiz(quiz) {
        try {
            const res = await fetch(
                `${config.API_ENDPOINT}/quizzes/${quiz.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `bearer ${TokenService.getAuthToken()}`,
                    },
                    body: JSON.stringify(quiz),
                }
            );

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error updating the quiz"
                );
            }

            // No response content will be provided, so just pass response
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default QuizApiService;
