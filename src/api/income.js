import axios from "axios";
import {getDateString} from "../util/stringUtils";

const BASE_URL = "http://localhost:8080/api/income";

const addIncome = (amount, dateDay) => {

    const userId = window.localStorage.getItem("userId");
    const date = new Date();
    date.setDate(dateDay);

    const data = {
        money: {
            currency: "RON",
            amount: amount,
        },
        date: getDateString(date),
        incomeCategory: "MONTHLY",
    }

    return axios.post(
        `${BASE_URL}/${userId}`,
        data
    );
}

const updateIncome = (amount, dateDay, id) => {
    const date = new Date();
    date.setDate(dateDay);

    const data = {
        money: {
            currency: "RON",
            amount: amount
        },
        date: getDateString(date),
        incomeCategory: "MONTHLY",
        id: id
    }

    return axios.put(
        BASE_URL,
        data
    );
}

export {addIncome, updateIncome};