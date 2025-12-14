import { FileText, Copy, Download, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { summaryApi, reportsApi } from "@/lib/api";
import { getUserId } from "@/lib/userSession";

export function DoctorSummaryCard() {
  const [copied, setCopied] = useState(false);
  const [summary, setSummary] = useState<string>("Loading summary...");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const userId = getUserId();
        const result = await summaryApi.getSummary(30, userId);
        setSummary(result.summary || "No health logs available for summary. Start logging your health to generate a summary.");
      } catch (error) {
        console.error("Failed to fetch summary:", error);
        setSummary("Unable to load summary. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
    // Listen for health log updates
    const handleUpdate = () => fetchSummary();
    window.addEventListener("healthLogUpdated", handleUpdate);
    return () => window.removeEventListener("healthLogUpdated", handleUpdate);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    toast({
      title: "Summary copied",
      description: "The health summary has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = async () => {
    try {
      toast({
        title: "Generating report",
        description: "Your health report is being prepared for download...",
      });
      
      const userId = getUserId();
      await reportsApi.downloadReport(30, 'summary', userId);
      
      toast({
        title: "Report downloaded",
        description: "Your health report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Doctor-Ready Summary</h3>
            <p className="text-sm text-muted-foreground">AI-generated clinical report</p>
          </div>
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-success/10 text-success">
          Updated today
        </span>
      </div>

      <div className="bg-muted/50 rounded-xl p-4 mb-4 border border-border/50 min-h-[120px]">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{summary}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Summary
            </>
          )}
        </Button>
        <Button className="flex-1" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export PDF for Doctor
        </Button>
      </div>
    </div>
  );
}
