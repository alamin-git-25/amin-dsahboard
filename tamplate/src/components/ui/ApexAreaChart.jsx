import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { day: "Mon", sales: 120 },
    { day: "Tue", sales: 200 },
    { day: "Wed", sales: 150 },
    { day: "Thu", sales: 300 },
    { day: "Fri", sales: 280 },
];

export function SalesAreaChart() {
    return (
        <div className="bg-(--card)  shadow-(--bs) p-8  h-72">
            <h3 className="font-semibold mb-2">Weekly Sales</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#22c55e"
                        fill="url(#salesGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
