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
import { useEffect, useState } from "react";
import { trendsApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { format, parseISO, subDays } from "date-fns";
import { getUserId } from "@/lib/userSession";

export function HealthTrendsChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const trends = await trendsApi.getTrends(7, userId);
        
        // Transform daily breakdown into chart data
        const chartData = trends.daily_breakdown.map((day) => ({
          day: format(parseISO(day.date), "EEE"),
          date: day.date,
          symptoms: day.symptoms_count,
          medications: day.medications_count * 10, // Scale for visibility
        }));
        
        // If no data, show empty chart
        if (chartData.length === 0) {
          // Generate empty data for last 7 days
          const emptyData = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), 6 - i);
            return {
              day: format(date, "EEE"),
              date: date.toISOString().split('T')[0],
              symptoms: 0,
              medications: 0,
            };
          });
          setData(emptyData);
        } else {
          setData(chartData);
        }
      } catch (error) {
        console.error("Failed to fetch trends:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
    // Listen for health log updates
    const handleUpdate = () => fetchTrends();
    window.addEventListener("healthLogUpdated", handleUpdate);
    return () => window.removeEventListener("healthLogUpdated", handleUpdate);
  }, []);
  return (
    <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Health Trends</h3>
        <p className="text-sm text-muted-foreground">Weekly overview of your health patterns</p>
      </div>

      <div className="h-72">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
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
              dataKey="medications"
              name="Medications (x10)"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={{ r: 4, fill: "hsl(var(--chart-3))" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
