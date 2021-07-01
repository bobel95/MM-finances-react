import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/payment/";
const DEFAULT_CURRENCY = "RON";

const addPayment = (userId, dateString, category, amount) => {

    const data = {
        date : dateString,
        paymentCategory: {
            category: category
        },
        money: {
            amount: amount,
            currency: DEFAULT_CURRENCY
        }
    }

    return axios.post(`${BASE_URL}${userId}`, data);
}

export { addPayment };