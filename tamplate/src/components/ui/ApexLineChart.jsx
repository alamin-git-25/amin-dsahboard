import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const data = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4200 },
    { month: "May", revenue: 6100 },
];

export function RevenueLineChart() {
    return (
        <div className="bg-(--card)  shadow-(--bs) p-8  h-72">
            <h3 className="font-semibold mb-2">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
