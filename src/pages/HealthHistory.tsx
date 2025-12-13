import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Calendar, Filter, Search, Activity, Brain, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const historyData = [
  {
    date: "Dec 13, 2024",
    symptoms: ["Headache", "Fatigue"],
    mood: "Calm",
    moodColor: "success",
    medications: 4,
    adherence: 100,
  },
  {
    date: "Dec 12, 2024",
    symptoms: ["Mild cough", "Throat irritation"],
    mood: "Stressed",
    moodColor: "warning",
    medications: 4,
    adherence: 75,
  },
  {
    date: "Dec 11, 2024",
    symptoms: ["None"],
    mood: "Happy",
    moodColor: "success",
    medications: 4,
    adherence: 100,
  },
  {
    date: "Dec 10, 2024",
    symptoms: ["Back pain", "Fatigue", "Headache"],
    mood: "Anxious",
    moodColor: "destructive",
    medications: 4,
    adherence: 100,
  },
  {
    date: "Dec 9, 2024",
    symptoms: ["Fatigue"],
    mood: "Neutral",
    moodColor: "muted",
    medications: 4,
    adherence: 100,
  },
];

const moodColorMap: Record<string, string> = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
  muted: "bg-muted text-muted-foreground border-border",
};

export default function HealthHistory() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Health History</h1>
            <p className="text-sm text-muted-foreground">Review your past health logs and patterns</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search symptoms, medications..."
            className="pl-10"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
            <Activity className="h-3 w-3 mr-1" />
            Symptoms
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
            <Brain className="h-3 w-3 mr-1" />
            Mental Health
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
            <Pill className="h-3 w-3 mr-1" />
            Medications
          </Badge>
        </div>

        {/* History Table/Cards */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden card-shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Symptoms</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Mood</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Medications</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Adherence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {historyData.map((entry, index) => (
                  <tr
                    key={entry.date}
                    className="hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-foreground">{entry.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {entry.symptoms.map((symptom) => (
                          <Badge
                            key={symptom}
                            variant="outline"
                            className="text-xs bg-medical-blue-light text-primary border-primary/20"
                          >
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={cn("text-xs", moodColorMap[entry.moodColor])}
                      >
                        {entry.mood}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground">{entry.medications} logged</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              entry.adherence === 100 ? "bg-success" : "bg-warning"
                            )}
                            style={{ width: `${entry.adherence}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{entry.adherence}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
