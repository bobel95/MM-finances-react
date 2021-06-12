import axios from 'axios';

const BASE_URL = "http://localhost:8080";

const getUser = id => {
    return axios.get(`${BASE_URL}/api/user/${id}`);
}

const register = (firstName, lastName, email, password) => {
    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    return axios.post(`${BASE_URL}/api/user`, data);
}

const signIn = (username, password) => {
    const data = {
        username: username,
        password: password
    }

    return axios.post("http://localhost:8080/authenticate", data)
}

const changePass = (prevPassword, newPassword, userId) => {
    const data = {
        prevPassword: prevPassword,
        newPassword: newPassword
    }
    console.log(data);

    return axios.post(`${BASE_URL}/api/user/change-password/${userId}`, data);
}


export {getUser, register, signIn, changePass};