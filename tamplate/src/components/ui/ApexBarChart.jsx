import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Electronics", stock: 120 },
    { name: "Clothing", stock: 90 },
    { name: "Grocery", stock: 150 },
    { name: "Furniture", stock: 60 },
];

export function InventoryBarChart() {
    return (
        <div className="bg-(--card)  shadow-(--bs) p-8  h-72">
            <h3 className="font-semibold mb-2">Inventory Stock</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} barSize={32}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                        dataKey="stock"
                        radius={[8, 8, 0, 0]}
                        fill="#0ea5e9"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
