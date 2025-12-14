import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Calendar, Filter, Search, Activity, Brain, Pill, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { trendsApi } from "@/lib/api";
import { getUserId } from "@/lib/userSession";
import { format, parseISO } from "date-fns";

const moodColorMap: Record<string, string> = {
  "Happy": "bg-success/10 text-success border-success/20",
  "Calm": "bg-success/10 text-success border-success/20",
  "Anxious": "bg-warning/10 text-warning border-warning/20",
  "Stressed": "bg-warning/10 text-warning border-warning/20",
  "Depressed": "bg-destructive/10 text-destructive border-destructive/20",
  "Neutral": "bg-muted text-muted-foreground border-border",
};

export default function HealthHistory() {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const trends = await trendsApi.getTrends(90, userId); // Last 90 days
        
        // Transform daily breakdown into history entries
        const history = trends.daily_breakdown
          .filter(day => day.symptoms_count > 0 || day.medications_count > 0 || day.mood)
          .map(day => {
            // Get full log data for this day to extract symptoms
            // For now, we'll use what we have from trends
            return {
              date: day.date,
              symptoms: day.unique_symptoms > 0 ? [`${day.unique_symptoms} symptom(s)`] : ["None"],
              mood: day.mood || "Not recorded",
              moodColor: day.mood ? (day.mood.includes("Happy") || day.mood.includes("Calm") ? "success" : 
                                     day.mood.includes("Anxious") || day.mood.includes("Stressed") ? "warning" : 
                                     day.mood.includes("Depressed") ? "destructive" : "muted") : "muted",
              medications: day.medications_count,
              adherence: day.medications_count > 0 ? 100 : 0,
            };
          });
        
        setHistoryData(history);
      } catch (error) {
        console.error("Failed to fetch health history:", error);
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
    // Listen for health log updates
    const handleUpdate = () => fetchHistory();
    window.addEventListener("healthLogUpdated", handleUpdate);
    return () => window.removeEventListener("healthLogUpdated", handleUpdate);
  }, []);

  // Filter by search term
  const filteredData = historyData.filter(entry => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      entry.date.toLowerCase().includes(search) ||
      entry.symptoms.some((s: string) => s.toLowerCase().includes(search)) ||
      entry.mood.toLowerCase().includes(search)
    );
  });

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        {loading ? (
          <div className="rounded-2xl bg-card border border-border p-12 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="rounded-2xl bg-card border border-border p-12 text-center">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Health History</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchTerm 
                ? "No entries match your search. Try different keywords."
                : "Start logging your health to see your history here."}
            </p>
            {!searchTerm && (
              <Button onClick={() => window.location.href = '/dashboard'}>
                Go to Dashboard
              </Button>
            )}
          </div>
        ) : (
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
                  {filteredData.map((entry, index) => (
                    <tr
                      key={entry.date}
                      className="hover:bg-muted/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-foreground">
                          {format(parseISO(entry.date), "MMM d, yyyy")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {entry.symptoms.map((symptom: string) => (
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
                          className={cn("text-xs", moodColorMap[entry.mood] || moodColorMap["Neutral"])}
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
                                entry.adherence === 100 ? "bg-success" : entry.adherence > 0 ? "bg-warning" : "bg-muted"
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
        )}
      </div>
    </DashboardLayout>
  );
}
