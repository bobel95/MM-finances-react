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

const createData = (category, amount) => {
    return {name: category, value: amount};
}

export {groupPaymentsByCategory, filterLastMonthPayments};