// Configuration
import config from "../config";
import TokenService from "./token-service";
import quizData from "./quiz_data";

const QuestionApiService = {
    async deleteQuestion(id) {
        // try {
        //     const res = await fetch(`${config.API_ENDPOINT}/questions/${id}`, {
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
        //                 "There was an error deleting the question"
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
    async getQuestions() {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/questions`, {
                headers: {
                    Authorization: `bearer ${TokenService.getAuthToken()}`,
                },
            });
            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error getting the questions"
                );
            }
            return await res.json();
        } catch (error) {
            throw new Error(error.message);
        }
        // return Promise.resolve(quizData.quizzes);
    },
    // Make this endpoint open to public?
    async getQuestion(questionId) {
        try {
            const res = await fetch(
                `${config.API_ENDPOINT}/questions/${questionId}`,
                {
                    headers: {
                        authorization: `bearer ${TokenService.getAuthToken()}`,
                    },
                }
            );

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error getting the question"
                );
            }

            return await res.json();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async postQuestion(question) {
        // try {
        //     const res = await fetch(`${config.API_ENDPOINT}/questions`, {
        //         method: "POST",
        //         headers: {
        //             "content-type": "application/json",
        //             authorization: `bearer ${TokenService.getAuthToken()}`,
        //         },
        //         body: JSON.stringify(question),
        //     });

        //     // If response was bad, throw error
        //     if (!res.ok) {
        //         const response = await res.json();
        //         throw new Error(
        //             response.error.message ||
        //                 "There was an error creating the question"
        //         );
        //     }

        //     return {
        //         question: await res.json(),
        //         // path: res.headers.get("Location"),
        //     };
        // } catch (error) {
        //     throw new Error(error.message);
        // }
        question.id = new Date().getTime();
        return { question: question };
    },
    async updateQuestion(question) {
        try {
            const res = await fetch(
                `${config.API_ENDPOINT}/questions/${question.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `bearer ${TokenService.getAuthToken()}`,
                    },
                    body: JSON.stringify(question),
                }
            );

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error updating the question"
                );
            }

            // No response content will be provided, so just pass response
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default QuestionApiService;
