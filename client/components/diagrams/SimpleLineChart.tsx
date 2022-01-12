import { FunctionComponent } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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