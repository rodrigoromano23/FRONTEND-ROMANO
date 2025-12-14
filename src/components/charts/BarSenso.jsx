import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export default function BarSenso({ data }) {
  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-2">
        Comparativa por año
      </h3>

      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="anio" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" />
      </BarChart>
    </div>
  );
}
