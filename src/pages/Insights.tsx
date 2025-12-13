import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  TrendingUp, 
  AlertTriangle, 
  Activity, 
  Brain, 
  Pill, 
  Calendar 
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const symptomFrequencyData = [
  { week: "Week 1", headache: 4, fatigue: 5, nausea: 1, dizziness: 2 },
  { week: "Week 2", headache: 3, fatigue: 4, nausea: 2, dizziness: 1 },
  { week: "Week 3", headache: 5, fatigue: 3, nausea: 1, dizziness: 3 },
  { week: "Week 4", headache: 2, fatigue: 4, nausea: 0, dizziness: 1 },
];

const moodTrendData = [
  { date: "Mon", mood: 7, anxiety: 3, stress: 4 },
  { date: "Tue", mood: 6, anxiety: 5, stress: 5 },
  { date: "Wed", mood: 8, anxiety: 2, stress: 3 },
  { date: "Thu", mood: 7, anxiety: 3, stress: 4 },
  { date: "Fri", mood: 9, anxiety: 1, stress: 2 },
  { date: "Sat", mood: 8, anxiety: 2, stress: 3 },
  { date: "Sun", mood: 7, anxiety: 3, stress: 4 },
];

const medicationAdherenceData = [
  { month: "Jan", adherence: 92 },
  { month: "Feb", adherence: 88 },
  { month: "Mar", adherence: 95 },
  { month: "Apr", adherence: 91 },
  { month: "May", adherence: 97 },
  { month: "Jun", adherence: 94 },
];

const warnings = [
  {
    type: "warning",
    title: "Recurring Headaches",
    description: "Headaches reported 4+ times this week. Consider consulting your doctor.",
    date: "Today",
  },
  {
    type: "info",
    title: "Sleep Pattern Change",
    description: "Average sleep duration decreased by 1.5 hours over the past week.",
    date: "2 days ago",
  },
  {
    type: "success",
    title: "Medication Adherence Improved",
    description: "97% adherence rate this month, up from 91% last month.",
    date: "This week",
  },
];

const insights = [
  {
    icon: Activity,
    title: "Most Common Symptom",
    value: "Headache",
    change: "+2 this week",
    trend: "up",
  },
  {
    icon: Brain,
    title: "Average Mood Score",
    value: "7.4/10",
    change: "+0.5 from last week",
    trend: "up",
  },
  {
    icon: Pill,
    title: "Medication Adherence",
    value: "94%",
    change: "+3% this month",
    trend: "up",
  },
  {
    icon: Calendar,
    title: "Logging Streak",
    value: "12 days",
    change: "Personal best!",
    trend: "up",
  },
];

export default function Insights() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Health Insights</h1>
          <p className="text-sm text-muted-foreground">Trends and patterns from your health data</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight, index) => (
            <div
              key={insight.title}
              className="rounded-2xl bg-card border border-border p-5 card-shadow animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-accent">
                  <insight.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{insight.title}</span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{insight.value}</p>
              <p className="text-xs text-green-600">{insight.change}</p>
            </div>
          ))}
        </div>

        {/* Early Warning Indicators */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-100">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Health Alerts</h3>
              <p className="text-sm text-muted-foreground">Important patterns detected in your data</p>
            </div>
          </div>
          <div className="space-y-3">
            {warnings.map((warning, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  warning.type === "warning"
                    ? "bg-amber-50 border-amber-200"
                    : warning.type === "success"
                    ? "bg-green-50 border-green-200"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        warning.type === "warning"
                          ? "text-amber-800"
                          : warning.type === "success"
                          ? "text-green-800"
                          : "text-blue-800"
                      }`}
                    >
                      {warning.title}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        warning.type === "warning"
                          ? "text-amber-700"
                          : warning.type === "success"
                          ? "text-green-700"
                          : "text-blue-700"
                      }`}
                    >
                      {warning.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{warning.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Symptom Frequency Chart */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Symptom Frequency</h3>
                <p className="text-sm text-muted-foreground">Weekly symptom occurrences</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={symptomFrequencyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="headache" fill="hsl(var(--primary))" name="Headache" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fatigue" fill="hsl(var(--primary) / 0.6)" name="Fatigue" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="dizziness" fill="hsl(var(--primary) / 0.3)" name="Dizziness" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mood Trends Chart */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Mood & Mental State</h3>
                <p className="text-sm text-muted-foreground">Daily mood tracking (1-10 scale)</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis domain={[0, 10]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.2)"
                    strokeWidth={2}
                    name="Mood"
                  />
                  <Area
                    type="monotone"
                    dataKey="anxiety"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive) / 0.1)"
                    strokeWidth={2}
                    name="Anxiety"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Medication Adherence Chart */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in lg:col-span-2" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent">
                <Pill className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Medication Adherence</h3>
                <p className="text-sm text-muted-foreground">Monthly medication compliance rate</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={medicationAdherenceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis domain={[80, 100]} className="text-xs" unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Adherence"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="adherence"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
