import { Activity, Brain, Pill, TrendingUp, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TileData {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext: string;
  trend?: "up" | "down" | "neutral";
  color: "blue" | "green" | "purple" | "orange";
}

const tiles: TileData[] = [
  {
    icon: Activity,
    label: "Symptoms Today",
    value: "3",
    subtext: "Headache, Fatigue, Mild Cough",
    trend: "down",
    color: "blue",
  },
  {
    icon: Brain,
    label: "Mental State",
    value: "Calm",
    subtext: "Better than yesterday",
    trend: "up",
    color: "green",
  },
  {
    icon: Pill,
    label: "Medications Logged",
    value: "4",
    subtext: "All on schedule",
    trend: "neutral",
    color: "purple",
  },
  {
    icon: TrendingUp,
    label: "Health Consistency",
    value: "85%",
    subtext: "7-day streak",
    trend: "up",
    color: "orange",
  },
];

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
