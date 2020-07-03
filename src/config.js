export default {
    API_ENDPOINT:
        process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api",
    PORT: process.env.PORT || 3000,
    TOKEN_KEY: "quiz-builder-client-auth-token",
};
