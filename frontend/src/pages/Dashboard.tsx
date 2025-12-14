import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VoiceLoggingCard } from "@/components/dashboard/VoiceLoggingCard";
import { HealthOverviewTiles } from "@/components/dashboard/HealthOverviewTiles";
import { HealthInsightsPanel } from "@/components/dashboard/HealthInsightsPanel";
import { HealthTrendsChart } from "@/components/dashboard/HealthTrendsChart";
import { DoctorSummaryCard } from "@/components/dashboard/DoctorSummaryCard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Voice Logging Card - Primary Action */}
        <VoiceLoggingCard />

        {/* Health Overview Tiles */}
        <HealthOverviewTiles />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Structured Health Insights */}
          <HealthInsightsPanel />

          {/* Health Trends Chart */}
          <HealthTrendsChart />
        </div>

        {/* Doctor Summary */}
        <DoctorSummaryCard />
      </div>
    </DashboardLayout>
  );
}
