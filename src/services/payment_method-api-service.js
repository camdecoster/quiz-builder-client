// Configuration
import config from "../config";
import TokenService from "./token-service";

const PaymentMethodApiService = {
    async deletePayment_method(id) {
        try {
            const res = await fetch(
                `${config.API_ENDPOINT}/payment-methods/${id}`,
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
                        "There was an error deleting the payment method"
                );
            }

            // No response content will be provided, so just pass response
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getPayment_methods() {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/payment-methods`, {
                headers: {
                    Authorization: `bearer ${TokenService.getAuthToken()}`,
                },
            });
            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error getting the payment methods"
                );
            }
            return await res.json();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getPayment_method(payment_methodId) {
        const res = await fetch(
            `${config.API_ENDPOINT}/payment-methods/${payment_methodId}`,
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
                    "There was an error getting the payment method"
            );
        }

        return await res.json();
    },
    async postPayment_method(payment_method) {
        try {
            const res = await fetch(`${config.API_ENDPOINT}/payment-methods`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${TokenService.getAuthToken()}`,
                },
                body: JSON.stringify(payment_method),
            });

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error creating the payment method"
                );
            }

            return {
                payment_method: await res.json(),
                path: res.headers.get("Location"),
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async updatePayment_method(payment_method) {
        try {
            const res = await fetch(
                `${config.API_ENDPOINT}/payment-methods/${payment_method.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `bearer ${TokenService.getAuthToken()}`,
                    },
                    body: JSON.stringify(payment_method),
                }
            );

            // If response was bad, throw error
            if (!res.ok) {
                const response = await res.json();
                throw new Error(
                    response.error.message ||
                        "There was an error updating the payment method"
                );
            }

            // No response content will be provided, so just pass response
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default PaymentMethodApiService;
