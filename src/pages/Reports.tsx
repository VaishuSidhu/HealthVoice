import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DoctorSummaryCard } from "@/components/dashboard/DoctorSummaryCard";
import { FileText, Calendar, Download, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const reportTypes = [
  {
    title: "Weekly Health Summary",
    description: "Overview of your health patterns from the past 7 days",
    icon: FileText,
    date: "Dec 7 - Dec 13, 2024",
  },
  {
    title: "Monthly Trend Report",
    description: "Detailed analysis of symptom patterns and medication adherence",
    icon: TrendingUp,
    date: "November 2024",
  },
  {
    title: "Quarterly Health Review",
    description: "Comprehensive health review with recommendations",
    icon: Calendar,
    date: "Q4 2024",
  },
];

export default function Reports() {
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
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
