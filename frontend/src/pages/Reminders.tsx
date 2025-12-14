import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reminders() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Reminders</h1>
          <p className="text-sm text-muted-foreground">Set up medication and health logging reminders</p>
        </div>

        {/* Coming Soon Message */}
        <div className="rounded-2xl bg-card border border-border p-12 text-center">
          <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Reminders Coming Soon</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The reminders feature will allow you to set up medication reminders and health logging notifications.
          </p>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
