import config from "../config";

const TokenService = {
    saveAuthToken(token) {
        window.localStorage.setItem(config.TOKEN_KEY, token);
    },
    getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY);
    },
    clearAuthToken() {
        window.localStorage.removeItem(config.TOKEN_KEY);
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken();
    },
    makeBasicAuthToken(userName, password) {
        return window.btoa(`${userName}:${password}`);
    },
    getUser() {
        if (TokenService.hasAuthToken()) {
            // Get token
            const token = TokenService.getAuthToken();

            // Get payload from token
            const payload = token.split(".")[1];

            // Return user
            return JSON.parse(window.atob(payload)).sub;
        }
        return "";
    },
};

export default TokenService;
