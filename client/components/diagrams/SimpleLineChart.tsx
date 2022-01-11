import { FunctionComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'date',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'date',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'date',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'date',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'date',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'date',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'date',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

interface SimpleLineChartProps {
    data: Array<any>,
    barNamesWithColor: Array<any>
}

const SimpleLineChart: FunctionComponent<SimpleLineChartProps> = ({ data, barNamesWithColor }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{
                    top: 20,
                    right: 10,
                    left: 0,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                    barNamesWithColor.map(bar =>
                        <Line key={bar.dataKey} type="monotone" dataKey={bar.dataKey} stroke={bar.stroke} activeDot={{ r: 8 }} />
                    )
                }
            </LineChart>
        </ResponsiveContainer>
    )
}

export default SimpleLineChart;