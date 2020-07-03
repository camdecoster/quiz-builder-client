import config from "../config";

const AuthApiService = {
    postLogin(credentials) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(credentials),
        }).then((res) =>
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        );
        // return Promise.resolve({
        //     authToken:
        //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        // });
    },
    postUser(user) {
        console.log(process.env);
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        }).then((res) =>
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        );
    },
};

export default AuthApiService;
