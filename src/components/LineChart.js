import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SimpleLineChart = (props) => {

    const { data, option1, option2, max } = props;

        return (
            <ResponsiveContainer >
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
                    <XAxis dataKey="name"  />
                    <YAxis type="number" domain={[0, parseInt(max + 1)]}/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={option1} stroke="#8884d8" />
                    <Line type="monotone" dataKey={option2} stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        );

}

export default SimpleLineChart;
