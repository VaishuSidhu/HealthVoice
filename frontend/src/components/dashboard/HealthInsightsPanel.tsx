import { Activity, Pill, Brain, Sun, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { insightsApi } from "@/lib/api";
import { getUserId } from "@/lib/userSession";

interface InsightSection {
  icon: typeof Activity;
  title: string;
  items: string[];
  color: string;
}

export function HealthInsightsPanel() {
  const [insights, setInsights] = useState<InsightSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const data = await insightsApi.getInsights(7, userId);
        
        const sections: InsightSection[] = [
          {
            icon: Activity,
            title: "Symptoms Detected",
            items: data.symptoms_detected.length > 0
              ? data.symptoms_detected.slice(0, 5).map(s => 
                  `${s.symptom} (${s.frequency} time${s.frequency !== 1 ? 's' : ''})`
                )
              : ["No symptoms detected in the last 7 days"],
            color: "text-primary",
          },
          {
            icon: Pill,
            title: "Medications & Timing",
            items: data.medications_timing.length > 0
              ? data.medications_timing.slice(0, 4).map(m => 
                  `${m.medication} (${m.mentions} mention${m.mentions !== 1 ? 's' : ''})`
                )
              : ["No medications mentioned"],
            color: "text-chart-5",
          },
          {
            icon: Brain,
            title: "Mental & Emotional State",
            items: [
              `Primary mood: ${data.mental_emotional_state.primary_mood}`,
              data.mental_emotional_state.total_mood_mentions > 0
                ? `Mood tracked ${data.mental_emotional_state.total_mood_mentions} time${data.mental_emotional_state.total_mood_mentions !== 1 ? 's' : ''}`
                : "No mood data available",
            ],
            color: "text-success",
          },
          {
            icon: Sun,
            title: "Lifestyle Context",
            items: [
              data.lifestyle_context.sleep.average_hours
                ? `Average sleep: ${data.lifestyle_context.sleep.average_hours} hours`
                : "Sleep data not available",
              `Exercise: ${data.lifestyle_context.exercise.mentions} mention${data.lifestyle_context.exercise.mentions !== 1 ? 's' : ''}`,
              `Stress: ${data.lifestyle_context.stress.mentions} mention${data.lifestyle_context.stress.mentions !== 1 ? 's' : ''}`,
            ],
            color: "text-warning",
          },
        ];
        
        setInsights(sections);
      } catch (error) {
        console.error("Failed to fetch insights:", error);
        setInsights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
    // Listen for health log updates
    const handleUpdate = () => fetchInsights();
    window.addEventListener("healthLogUpdated", handleUpdate);
    return () => window.removeEventListener("healthLogUpdated", handleUpdate);
  }, []);
  return (
    <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent">
          <CheckCircle2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Structured Health Insights</h3>
          <p className="text-sm text-muted-foreground">Auto-analyzed from your voice input</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((section) => (
          <div key={section.title} className="space-y-3">
            <div className="flex items-center gap-2">
              <section.icon className={`h-4 w-4 ${section.color}`} />
              <h4 className="font-medium text-foreground">{section.title}</h4>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}
