import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Completed", value: 400 },
    { name: "Pending", value: 200 },
    { name: "Cancelled", value: 100 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export function OrderStatusChart() {
    return (
        <div className="bg-(--card)  shadow-(--bs) p-8  h-72">
            <h3 className="font-semibold mb-2">Order Status</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
