import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {formatEnumString} from "../util/stringUtils";

const tableContainerStyle = {
    width: "50%",
    margin: "0 auto"
}

const PaymentsTable = (props) => {

    const payments = props.payments;
    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'category', headerName: 'Category', width: 280 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'currency', headerName: 'Currency', width: 150 },
    ];

    const createData = (id, date, category, amount, currency) => {
        return {id, date, category, amount, currency};
    }

    const createRows = () => {
        setRows(payments.map(p =>
            createData(
                p.id,
                p.date,
                formatEnumString(p.paymentCategory),
                p.money.amount,
                p.money.currency
            )));
    }
    useEffect(createRows, [payments]);

    return (
        <div style={tableContainerStyle}>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={5}/>
            </div>
        </div>
    );
}

export default PaymentsTable;
