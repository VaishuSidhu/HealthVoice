import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VoiceLoggingCard } from "@/components/dashboard/VoiceLoggingCard";
import { Clock, Mic } from "lucide-react";

const recentLogs = [
  {
    time: "Today, 9:30 AM",
    transcript: "Woke up with a mild headache, took my morning vitamins. Feeling a bit tired but overall okay. Had a good breakfast.",
    duration: "45 sec",
  },
  {
    time: "Yesterday, 8:15 PM",
    transcript: "End of day check-in. Headache is gone. Took all my medications on time. Mood is calm, stress level low. Going to bed early.",
    duration: "38 sec",
  },
  {
    time: "Yesterday, 12:00 PM",
    transcript: "Quick lunch update. Feeling better after the morning. Had some water and a light meal. No symptoms to report.",
    duration: "22 sec",
  },
];

export default function VoiceLog() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Voice Log</h1>
          <p className="text-sm text-muted-foreground">Record and review your health voice entries</p>
        </div>

        {/* Voice Logging Card */}
        <VoiceLoggingCard />

        {/* Recent Voice Logs */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent">
              <Mic className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Recent Voice Entries</h3>
              <p className="text-sm text-muted-foreground">Your latest health recordings</p>
            </div>
          </div>

          <div className="space-y-4">
            {recentLogs.map((log, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-muted/50 border border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{log.time}</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {log.duration}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{log.transcript}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
