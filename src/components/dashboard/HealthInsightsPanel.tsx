import { Activity, Pill, Brain, Sun, CheckCircle2 } from "lucide-react";

interface InsightSection {
  icon: typeof Activity;
  title: string;
  items: string[];
  color: string;
}

const insights: InsightSection[] = [
  {
    icon: Activity,
    title: "Symptoms Detected",
    items: [
      "Mild headache (morning, duration: 2 hours)",
      "Fatigue level: Moderate",
      "Slight throat irritation",
    ],
    color: "text-primary",
  },
  {
    icon: Pill,
    title: "Medications & Timing",
    items: [
      "Vitamin D - 8:00 AM ✓",
      "Blood Pressure Med - 9:00 AM ✓",
      "Omega-3 - 12:00 PM ✓",
      "Allergy Med - 6:00 PM (upcoming)",
    ],
    color: "text-chart-5",
  },
  {
    icon: Brain,
    title: "Mental & Emotional State",
    items: [
      "Overall mood: Calm and focused",
      "Stress level: Low (3/10)",
      "Sleep quality: Good (7.5 hours)",
    ],
    color: "text-success",
  },
  {
    icon: Sun,
    title: "Lifestyle Context",
    items: [
      "Physical activity: 30 min walk",
      "Water intake: 6 glasses",
      "Meals: 3 balanced meals",
    ],
    color: "text-warning",
  },
];

export function HealthInsightsPanel() {
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
    </div>
  );
}
