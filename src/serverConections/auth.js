const fetchUrl = "http://localhost:4001";

const login = (email, password) => {
    return fetch(
        fetchUrl + "/login",
        {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: 'include'
        }
    );
}

const signUp = (firstName, lastName, email, password, confirmPassword) => {
    return fetch(
        fetchUrl + "/register",
        {
            method: "POST",
            mode: "cors",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }),
            credentials: 'include'
        }
    );
};

const signOut = () => {
    return fetch(
        fetchUrl + "/refreshToken",
        {
            method: "DELETE",
            mode: "cors",
            credentials: 'include'
        }
    );
}

const refreshToken = () => {
    return fetch(
        fetchUrl + "/refreshToken",
        {
            method: "POST",
            mode: "cors",
            credentials: 'include'
        }
    );
}


export {login, signUp, signOut, refreshToken};