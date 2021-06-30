import axios from "axios";

const BASE_URL = "http://localhost:8080/api/category";

const getCustomPaymentCategories = () => {

    const userId = window.localStorage.getItem("userId");

    return axios.get(`${BASE_URL}/${userId}`);
}

export {getCustomPaymentCategories};