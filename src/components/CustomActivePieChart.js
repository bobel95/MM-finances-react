import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import Typography from "@material-ui/core/Typography";
import {formatEnumString} from '../util/stringUtils';


const createData = (category, amount) => {
    category = formatEnumString(category);
    return {name: category, value: amount};
}

// const formatEnumString = str => {
//     str = str.toLowerCase();
//     let res = "";
//     for (let i = 0; i < str.length; i++) {
//         if (str.charAt(i) === "_") {
//             res += " ";
//         } else {
//             res += str.charAt(i);
//         }
//     }
//
//     return res.charAt(0).toUpperCase() + res.slice(1);
// }

const groupByCategory = (data) => {

    return Array.from(data.reduce(
        (m, {name, value}) => m.set(name, (m.get(name) || 0 ) + value), new Map),
        ([name, value]) => ({name, value}));
}

const formatData = (data) => {
    data = groupByCategory(data);
    const COLORS = ['#DF602A', '#B85194', '#00F5B4', '#9DA9E7', '#975E5F', '#790DAB', '#FFEC51', '#230C0F', '#C7B494', '#4D4B81', '#718C98'];
    data.forEach((entry, i) => {
        entry.color = COLORS[i];
    });

    return data;
}

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#000" style={{fontFamily: "Roboto, sans-serif"}}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={payload.payload.color}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={payload.payload.color}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={payload.payload.color} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} RON`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const CustomActivePieChart = (props) => {

    const payments = props.payments;

    let data = payments.map((p) => createData(p.paymentCategory, p.money.amount));
    data = formatData(data);
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };



    return (
        <ResponsiveContainer width="100%" height="100%" style={{border: "3px solid black"}}>
            <PieChart width={500} height={500}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={150}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color}/>
                        ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export default CustomActivePieChart;