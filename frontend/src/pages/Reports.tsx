import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DoctorSummaryCard } from "@/components/dashboard/DoctorSummaryCard";
import { FileText, Calendar, Download, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { reportsApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { getUserId } from "@/lib/userSession";

const reportTypes = [
  {
    title: "Weekly Health Summary",
    description: "Overview of your health patterns from the past 7 days",
    icon: FileText,
    date: "Last 7 days",
    days: 7,
    type: "weekly",
  },
  {
    title: "Monthly Trend Report",
    description: "Detailed analysis of symptom patterns and medication adherence",
    icon: TrendingUp,
    date: "Last 30 days",
    days: 30,
    type: "monthly",
  },
  {
    title: "Quarterly Health Review",
    description: "Comprehensive health review with recommendations",
    icon: Calendar,
    date: "Last 90 days",
    days: 90,
    type: "quarterly",
  },
];

export default function Reports() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDownload = async (report: typeof reportTypes[0]) => {
    try {
      setDownloading(report.type);
      toast({
        title: "Generating report",
        description: `Preparing your ${report.title.toLowerCase()}...`,
      });
      
      const userId = getUserId();
      await reportsApi.downloadReport(report.days, report.type, userId);
      
      toast({
        title: "Report downloaded",
        description: `Your ${report.title.toLowerCase()} has been downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "Failed to download report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Health Reports</h1>
          <p className="text-sm text-muted-foreground">Generate and export your health reports</p>
        </div>

        {/* Doctor Summary */}
        <DoctorSummaryCard />

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reportTypes.map((report, index) => (
            <div
              key={report.title}
              className="rounded-2xl bg-card border border-border p-6 card-shadow hover:border-primary/30 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-3 rounded-xl bg-accent w-fit mb-4">
                <report.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{report.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
              <p className="text-xs text-muted-foreground mb-4">{report.date}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDownload(report)}
                disabled={downloading === report.type}
              >
                {downloading === report.type ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
