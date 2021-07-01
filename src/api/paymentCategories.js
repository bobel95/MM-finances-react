import axios from "axios";

const BASE_URL = "http://localhost:8080/api/category";

const getCustomPaymentCategories = () => {

    const userId = window.localStorage.getItem("userId");

    return axios.get(`${BASE_URL}/${userId}`);
}

const addPaymentCategory = (category) => {
    const userId = window.localStorage.getItem("userId");

    const data = {
        category: category
    };

    return axios.post(`${BASE_URL}/${userId}`, data);

}

export { getCustomPaymentCategories, addPaymentCategory };