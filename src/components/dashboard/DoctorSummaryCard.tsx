import { FileText, Copy, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const summaryText = `Patient has reported mild symptoms over the past week including intermittent headaches (primarily in the morning) and moderate fatigue. Medication adherence is excellent at 95% compliance. Mental health indicators show stable mood with low stress levels. Physical activity has been consistent with daily 30-minute walks. Sleep quality has improved compared to the previous week. No concerning patterns detected. Recommend continuing current medication regimen and lifestyle habits.`;

export function DoctorSummaryCard() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summaryText);
    setCopied(true);
    toast({
      title: "Summary copied",
      description: "The health summary has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    toast({
      title: "Exporting PDF",
      description: "Your doctor-ready summary is being prepared for download.",
    });
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

      <div className="bg-muted/50 rounded-xl p-4 mb-4 border border-border/50">
        <p className="text-sm text-foreground leading-relaxed">{summaryText}</p>
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
