import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//     {
//         name: 'Jan',
//         Tools: 4000,
//         pv: 2400,
//     },
//     {
//         name: 'Feb',
//         Tools: 3000,
//         pv: 1398,
//     },
//     {
//         name: 'Mar',
//         Tools: 2000,
//         pv: 9800,
//     },
//     {
//         name: 'Apr',
//         Tools: 2780,
//         pv: 3908,
//     },
//     {
//         name: 'May',
//         Tools: 1890,
//         pv: 4800,
//     },
//     {
//         name: 'Jun',
//         Tools: 2390,
//         pv: 3800,
//     },
//     {
//         name: 'Jul',
//         Tools: 3490,
//         pv: 4300,
//     },
//     {
//         name: 'Aug',
//         Tools: 3490,
//         pv: 4300,
//     },
//     {
//         name: 'Sep',
//         Tools: 3490,
//         pv: 4300,
//     },
//     {
//         name: 'Oct',
//         Tools: 3490,
//         pv: 4300,
//     },
//     {
//         name: 'Nov',
//         Tools: 3490,
//         pv: 4300,
//     },
//     {
//         name: 'Dec',
//         Tools: 3490,
//         pv: 4300,
//     },
// ];

const SimpleLineChart = (props) => {

    const { data, option1, option2 } = props;
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={option1} stroke="#8884d8" />
                    <Line type="monotone" dataKey={option2} stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        );

}

export default SimpleLineChart;
