// Configuration
import config from "../config";
import TokenService from "./token-service";

const ExpenseApiService = {
    async deleteExpense(expenseId) {
        try {
            const res = await fetch(
                `${config.API_ENDPOINT}/expenses/${expenseId}`,
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `bearer ${TokenService.getAuthToken()}`,
                    },
                }
            );

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error deleting the expense"
                );
            }

            // No response content will be provided, so just pass response
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getExpenses() {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/expenses`, {
                headers: {
                    Authorization: `bearer ${TokenService.getAuthToken()}`,
                },
            });
            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error getting the expenses"
                );
            }
            return await res.json();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getExpense(expenseId) {
        const res = await fetch(
            `${config.API_ENDPOINT}/expenses/${expenseId}`,
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
                    "There was an error getting the expense"
            );
        }

        return await res.json();
    },
    async postExpense(expense) {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/expenses`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${TokenService.getAuthToken()}`,
                },
                body: JSON.stringify(expense),
            });

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error creating the expense"
                );
            }

            return {
                expense: await res.json(),
                path: res.headers.get("Location"),
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async updateExpense(expense) {
        try {
            const res = await fetch(
                `${config.API_ENDPOINT}/expenses/${expense.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `bearer ${TokenService.getAuthToken()}`,
                    },
                    body: JSON.stringify(expense),
                }
            );

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error updating the expense"
                );
            }

            // No response content will be provided, so just pass response
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default ExpenseApiService;
