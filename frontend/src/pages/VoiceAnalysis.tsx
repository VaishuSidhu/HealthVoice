import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  FileText, 
  Activity, 
  Pill, 
  Brain, 
  Heart, 
  Copy, 
  Download, 
  Check,
  Mic
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { insightsApi } from "@/lib/api";
import { getUserId } from "@/lib/userSession";
import { Loader2 } from "lucide-react";

export default function VoiceAnalysis() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const insights = await insightsApi.getInsights(7, userId);
        
        // Transform insights into analysis format
        if (insights.symptoms_detected.length > 0 || insights.medications_timing.length > 0) {
          setAnalysisData({
            symptoms: insights.symptoms_detected.slice(0, 5).map((s: any) => ({
              name: s.symptom,
              severity: s.frequency > 3 ? "Frequent" : s.frequency > 1 ? "Moderate" : "Occasional",
              frequency: s.frequency,
            })),
            medications: insights.medications_timing.map((m: any) => ({
              name: m.medication,
              mentions: m.mentions,
            })),
            mentalState: {
              mood: insights.mental_emotional_state.primary_mood,
              totalMentions: insights.mental_emotional_state.total_mood_mentions,
            },
            lifestyle: insights.lifestyle_context,
            summary: `Analysis based on ${insights.analysis_period.total_logs} health log(s) over the past ${insights.analysis_period.days} days.`,
          });
        } else {
          setAnalysisData(null);
        }
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
        setAnalysisData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
    const handleUpdate = () => fetchAnalysis();
    window.addEventListener("healthLogUpdated", handleUpdate);
    return () => window.removeEventListener("healthLogUpdated", handleUpdate);
  }, []);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleExportPDF = () => {
    toast.success("Use the Reports page to download detailed reports.");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  if (!analysisData) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Voice Analysis</h1>
              <p className="text-sm text-muted-foreground">Your voice input converted to structured medical data</p>
            </div>
          </div>

          <div className="rounded-2xl bg-card border border-border p-12 text-center">
            <Mic className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Analysis Available</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start logging your health to see analysis here.
            </p>
            <Button onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
            <Button size="sm" onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Symptoms */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Symptoms Detected</h3>
              </div>
            </div>
            <div className="space-y-3">
              {analysisData.symptoms.map((symptom: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{symptom.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {symptom.severity} - {symptom.frequency} occurrence(s)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medications */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Medications</h3>
              </div>
            </div>
            <div className="space-y-3">
              {analysisData.medications.map((med: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{med.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Mentioned {med.mentions} time(s)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mental State */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Mental & Emotional State</h3>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-foreground mb-1">
                Primary Mood: {analysisData.mentalState.mood}
              </p>
              <p className="text-xs text-muted-foreground">
                Tracked {analysisData.mentalState.totalMentions} time(s)
              </p>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Lifestyle Context</h3>
              </div>
            </div>
            <div className="space-y-2">
              {analysisData.lifestyle.sleep?.average_hours && (
                <p className="text-sm text-foreground">
                  Average Sleep: {analysisData.lifestyle.sleep.average_hours} hours
                </p>
              )}
              {analysisData.lifestyle.exercise && (
                <p className="text-sm text-foreground">
                  Exercise: {analysisData.lifestyle.exercise.mentions} mention(s)
                </p>
              )}
              {analysisData.lifestyle.stress && (
                <p className="text-sm text-foreground">
                  Stress: {analysisData.lifestyle.stress.mentions} mention(s)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Analysis Summary</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(analysisData.summary, "summary")}
            >
              {copiedSection === "summary" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{analysisData.summary}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
