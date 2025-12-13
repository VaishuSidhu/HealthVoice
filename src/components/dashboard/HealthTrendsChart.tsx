import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { day: "Mon", symptoms: 4, mood: 6, medications: 100 },
  { day: "Tue", symptoms: 3, mood: 7, medications: 100 },
  { day: "Wed", symptoms: 5, mood: 5, medications: 75 },
  { day: "Thu", symptoms: 2, mood: 8, medications: 100 },
  { day: "Fri", symptoms: 3, mood: 7, medications: 100 },
  { day: "Sat", symptoms: 2, mood: 8, medications: 100 },
  { day: "Sun", symptoms: 3, mood: 7, medications: 100 },
];

export function HealthTrendsChart() {
  return (
    <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Health Trends</h3>
        <p className="text-sm text-muted-foreground">Weekly overview of your health patterns</p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              domain={[0, 10]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--card-shadow)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
              iconSize={8}
            />
            <Line
              type="monotone"
              dataKey="symptoms"
              name="Symptoms"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ r: 4, fill: "hsl(var(--chart-1))" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="Mood Score"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={{ r: 4, fill: "hsl(var(--chart-3))" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
