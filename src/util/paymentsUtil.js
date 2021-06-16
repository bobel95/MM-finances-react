const groupPaymentsByCategory = (data) => {
    data = data.map((p) => createData(p.paymentCategory, p.money.amount));

    return Array.from(data.reduce(
        (m, {name, value}) => m.set(name, (m.get(name) || 0 ) + value), new Map),
        ([name, value]) => ({name, value}));
}

const filterLastMonthPayments = data => {
    let res = [];

    let lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    for (let i = 0; i < data.length; i++) {
        let paymentDate = new Date(data[i].date);
        if (paymentDate > lastMonth) {
            res.push(data[i]);
        }
    }

    return res;
}

const filterPaymentsByDate = (payments, date) => {
    return payments.filter(p => new Date(p.date) > date)
}

const filterPaymentsByDateBetween = (payments, startDate, endDate) => {
    return payments.filter(p => {
        let paymentDate = new Date(p.date);
        return (paymentDate > startDate) &&
            (paymentDate < endDate);
    })
}

const createData = (category, amount) => {
    return {name: category, value: amount};
}

export {groupPaymentsByCategory, filterLastMonthPayments, filterPaymentsByDate};