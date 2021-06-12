import React, {useState, useEffect} from 'react';
import { getUser } from "../api/appUser";
import {filterLastMonthPayments, groupPaymentsByCategory} from "../util/paymentsUtil";

const IncomeData = () => {

    const [data, setData] = useState({income: [], payments: []});

    useEffect(() => {
        getUser()
            .then(res => {
                setData({
                    income: res.data.incomeList,
                    payments: res.data.paymentList
                });
            })
    }, [])

    let data1 = filterLastMonthPayments(data.payments);
    data1 = groupPaymentsByCategory(data1);
    console.log(data1);

    return (
        <div>

        </div>
    );
};

export default IncomeData;
