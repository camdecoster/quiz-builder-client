// Configuration
import config from "../config";
import TokenService from "./token-service";

const CategoryApiService = {
    async deleteCategory(id) {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/categories/${id}`, {
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
                        "There was an error deleting the category"
                );
            }

            // No response content will be provided, so just pass response
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getCategories() {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/categories`, {
                headers: {
                    Authorization: `bearer ${TokenService.getAuthToken()}`,
                },
            });
            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error getting the categories"
                );
            }
            return await res.json();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getCategory(categoryId) {
        // return fetch(`${config.API_ENDPOINT}/categories/${categoryId}`, {
        //     headers: {
        //         authorization: `bearer ${TokenService.getAuthToken()}`,
        //     },
        // }).then((res) => {
        //     !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
        // });
        const res = await fetch(
            `${config.API_ENDPOINT}/categories/${categoryId}`,
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
                    "There was an error getting the category"
            );
        }

        return await res.json();
    },
    async postCategory(category) {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/categories`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${TokenService.getAuthToken()}`,
                },
                body: JSON.stringify(category),
            });

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error creating the category"
                );
            }

            return {
                category: await res.json(),
                path: res.headers.get("Location"),
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async updateCategory(category) {
        try {
            const res = await fetch(
                `${config.API_ENDPOINT}/categories/${category.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `bearer ${TokenService.getAuthToken()}`,
                    },
                    body: JSON.stringify(category),
                }
            );

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error updating the category"
                );
            }

            // No response content will be provided, so just pass response
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default CategoryApiService;
