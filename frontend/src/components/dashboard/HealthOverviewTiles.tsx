import { Activity, Brain, Pill, TrendingUp, LucideIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { dashboardApi } from "@/lib/api";
import { getUserId } from "@/lib/userSession";

interface TileData {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext: string;
  trend?: "up" | "down" | "neutral";
  color: "blue" | "green" | "purple" | "orange";
}

const colorClasses = {
  blue: {
    bg: "bg-medical-blue-light",
    icon: "text-primary",
    border: "border-primary/20",
  },
  green: {
    bg: "bg-success/10",
    icon: "text-success",
    border: "border-success/20",
  },
  purple: {
    bg: "bg-chart-5/10",
    icon: "text-chart-5",
    border: "border-chart-5/20",
  },
  orange: {
    bg: "bg-warning/10",
    icon: "text-warning",
    border: "border-warning/20",
  },
};

export function HealthOverviewTiles() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      const overview = await dashboardApi.getOverview(userId);
      setData(overview);
      console.log("Dashboard data refreshed:", overview);
    } catch (error) {
      console.error("Failed to fetch dashboard overview:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Listen for health log updates
    const handleUpdate = () => {
      console.log("Health log updated - refreshing dashboard...");
      // Small delay to ensure backend has processed the new log
      setTimeout(() => fetchData(), 500);
    };
    window.addEventListener("healthLogUpdated", handleUpdate);
    // Also refresh every 30 seconds to catch any external updates
    const interval = setInterval(fetchData, 30000);
    return () => {
      window.removeEventListener("healthLogUpdated", handleUpdate);
      clearInterval(interval);
    };
  }, []);

  const tiles: TileData[] = data ? [
    {
      icon: Activity,
      label: "Symptoms Today",
      value: data.today_symptoms.length.toString(),
      subtext: data.today_symptoms.length > 0 
        ? data.today_symptoms.slice(0, 3).join(", ") 
        : "No symptoms reported",
      trend: data.today_symptoms.length > 0 ? "neutral" : undefined,
      color: "blue",
    },
    {
      icon: Brain,
      label: "Mental State",
      value: data.mental_state || "Neutral",
      subtext: data.health_consistency.streak_days > 0 
        ? `${data.health_consistency.streak_days}-day streak` 
        : "No recent logs",
      trend: "neutral",
      color: "green",
    },
    {
      icon: Pill,
      label: "Medications Logged",
      value: data.medications_logged.length.toString(),
      subtext: data.medications_logged.length > 0 
        ? data.medications_logged.slice(0, 2).join(", ") 
        : "None today",
      trend: "neutral",
      color: "purple",
    },
    {
      icon: TrendingUp,
      label: "Health Consistency",
      value: data.health_consistency.streak_days > 0 
        ? `${data.health_consistency.streak_days} days` 
        : "0 days",
      subtext: `${data.health_consistency.total_logs} total logs`,
      trend: data.health_consistency.streak_days > 0 ? "up" : "neutral",
      color: "orange",
    },
  ] : [];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl bg-card p-5 border flex items-center justify-center h-32">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tiles.map((tile, index) => (
        <div
          key={tile.label}
          className={cn(
            "rounded-xl bg-card p-5 border tile-shadow transition-all duration-200 hover:card-shadow animate-fade-in",
            colorClasses[tile.color].border
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={cn("p-2.5 rounded-lg", colorClasses[tile.color].bg)}>
              <tile.icon className={cn("h-5 w-5", colorClasses[tile.color].icon)} />
            </div>
            {tile.trend && (
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  tile.trend === "up" && "bg-success/10 text-success",
                  tile.trend === "down" && "bg-destructive/10 text-destructive",
                  tile.trend === "neutral" && "bg-muted text-muted-foreground"
                )}
              >
                {tile.trend === "up" && "↑ Improving"}
                {tile.trend === "down" && "↓ Declining"}
                {tile.trend === "neutral" && "→ Stable"}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">{tile.label}</p>
          <p className="text-2xl font-semibold text-foreground mb-1">{tile.value}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{tile.subtext}</p>
        </div>
      ))}
    </div>
  );
}
