import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  FileText, 
  Activity, 
  Pill, 
  Brain, 
  Heart, 
  Copy, 
  Download, 
  Edit, 
  Save,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const analysisData = {
  transcript: "I woke up this morning with a mild headache on the left side. Took my blood pressure medication around 8 AM with breakfast. Feeling a bit anxious about my doctor's appointment tomorrow. Had a light lunch and went for a 20-minute walk. The headache went away after lunch. Overall energy level is moderate today.",
  symptoms: [
    { name: "Headache (left side)", severity: "Mild", time: "Morning", resolved: true },
    { name: "Fatigue", severity: "Moderate", time: "All day", resolved: false },
  ],
  medications: [
    { name: "Blood Pressure Medication", time: "8:00 AM", withFood: true, notes: "Taken with breakfast" },
  ],
  mentalState: {
    mood: "Slightly Anxious",
    stressLevel: "Moderate",
    notes: "Anxiety related to upcoming doctor's appointment",
  },
  lifestyle: {
    exercise: "20-minute walk after lunch",
    diet: "Light lunch consumed",
    sleep: "Not mentioned",
    hydration: "Not mentioned",
  },
  summary: "Patient reports a mild left-sided headache upon waking that resolved after lunch. Blood pressure medication taken as prescribed at 8:00 AM with breakfast. Patient expresses moderate anxiety regarding an upcoming medical appointment. Physical activity included a 20-minute walk. Overall energy described as moderate. Recommend continued medication adherence and stress management techniques prior to appointment.",
};

export default function VoiceAnalysis() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleExportPDF = () => {
    toast.success("PDF export started. Download will begin shortly.");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Voice Analysis</h1>
            <p className="text-sm text-muted-foreground">Your voice input converted to structured medical data</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Summary
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Entry
            </Button>
            <Button size="sm" onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Transcribed Voice Text */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Voice Transcript</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(analysisData.transcript, "transcript")}
              >
                {copiedSection === "transcript" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-4 rounded-lg">
              "{analysisData.transcript}"
            </p>
            <p className="text-xs text-muted-foreground mt-3">Recorded today at 10:30 AM</p>
          </div>

          {/* Symptoms Detected */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Symptoms Detected</h3>
            </div>
            <div className="space-y-3">
              {analysisData.symptoms.map((symptom, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{symptom.name}</p>
                    <p className="text-xs text-muted-foreground">{symptom.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                      {symptom.severity}
                    </span>
                    {symptom.resolved && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                        Resolved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medications & Timing */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent">
                <Pill className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Medications & Timing</h3>
            </div>
            <div className="space-y-3">
              {analysisData.medications.map((med, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-muted/50 border border-border/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">{med.name}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {med.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {med.withFood && (
                      <span className="flex items-center gap-1">
                        <Check className="h-3 w-3 text-green-600" />
                        Taken with food
                      </span>
                    )}
                    <span>• {med.notes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mental & Emotional State */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Mental & Emotional State</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Mood</span>
                <span className="text-sm font-medium text-foreground px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                  {analysisData.mentalState.mood}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Stress Level</span>
                <span className="text-sm font-medium text-foreground">{analysisData.mentalState.stressLevel}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">{analysisData.mentalState.notes}</p>
              </div>
            </div>
          </div>

          {/* Lifestyle Context */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in lg:col-span-2" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Lifestyle Context</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Exercise</p>
                <p className="text-sm font-medium text-foreground">{analysisData.lifestyle.exercise}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Diet</p>
                <p className="text-sm font-medium text-foreground">{analysisData.lifestyle.diet}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Sleep</p>
                <p className="text-sm font-medium text-muted-foreground italic">{analysisData.lifestyle.sleep}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Hydration</p>
                <p className="text-sm font-medium text-muted-foreground italic">{analysisData.lifestyle.hydration}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor-Ready Summary */}
        <div className="rounded-2xl bg-card border-2 border-primary/20 p-6 card-shadow animate-fade-in" style={{ animationDelay: "250ms" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Doctor-Ready Summary</h3>
                <p className="text-xs text-muted-foreground">Professional clinical format</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(analysisData.summary, "summary")}
              >
                {copiedSection === "summary" ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Summary
                  </>
                )}
              </Button>
              <Button size="sm" onClick={handleExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF for Doctor
              </Button>
            </div>
          </div>
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <p className="text-sm text-foreground leading-relaxed">{analysisData.summary}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Generated from voice input on {new Date().toLocaleDateString()} at 10:30 AM
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
