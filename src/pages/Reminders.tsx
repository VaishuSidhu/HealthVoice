import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Bell, Pill, Mic, AlertTriangle, Plus, Clock, Calendar } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const medicationReminders = [
  {
    id: 1,
    name: "Blood Pressure Medication",
    time: "8:00 AM",
    frequency: "Daily",
    enabled: true,
  },
  {
    id: 2,
    name: "Vitamin D Supplement",
    time: "9:00 AM",
    frequency: "Daily",
    enabled: true,
  },
  {
    id: 3,
    name: "Allergy Medication",
    time: "10:00 PM",
    frequency: "As needed",
    enabled: false,
  },
];

const voiceReminders = [
  {
    id: 1,
    name: "Morning Health Check-in",
    time: "9:00 AM",
    frequency: "Daily",
    enabled: true,
  },
  {
    id: 2,
    name: "Evening Mood Log",
    time: "8:00 PM",
    frequency: "Daily",
    enabled: true,
  },
  {
    id: 3,
    name: "Weekly Symptom Review",
    time: "Sunday, 6:00 PM",
    frequency: "Weekly",
    enabled: false,
  },
];

const symptomAlerts = [
  {
    id: 1,
    name: "Recurring Headache Alert",
    condition: "3+ headaches in a week",
    enabled: true,
  },
  {
    id: 2,
    name: "Low Mood Pattern",
    condition: "Mood below 5 for 3+ days",
    enabled: true,
  },
  {
    id: 3,
    name: "Missed Medication Alert",
    condition: "Medication missed 2+ times",
    enabled: true,
  },
];

export default function Reminders() {
  const [medReminders, setMedReminders] = useState(medicationReminders);
  const [voiceRems, setVoiceRems] = useState(voiceReminders);
  const [alerts, setAlerts] = useState(symptomAlerts);

  const toggleMedReminder = (id: number) => {
    setMedReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const toggleVoiceReminder = (id: number) => {
    setVoiceRems(prev =>
      prev.map(r => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const toggleAlert = (id: number) => {
    setAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Reminders & Alerts</h1>
            <p className="text-sm text-muted-foreground">Manage your health notifications</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Reminder
          </Button>
        </div>

        {/* Medication Reminders */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent">
              <Pill className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Medication Reminders</h3>
              <p className="text-sm text-muted-foreground">Never miss a dose</p>
            </div>
          </div>

          <div className="space-y-4">
            {medReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{reminder.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{reminder.time}</span>
                      <span>•</span>
                      <span>{reminder.frequency}</span>
                    </div>
                  </div>
                </div>
                <Switch
                  checked={reminder.enabled}
                  onCheckedChange={() => toggleMedReminder(reminder.id)}
                />
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Medication Reminder
          </Button>
        </div>

        {/* Voice Logging Reminders */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent">
              <Mic className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Voice Logging Reminders</h3>
              <p className="text-sm text-muted-foreground">Stay consistent with health updates</p>
            </div>
          </div>

          <div className="space-y-4">
            {voiceRems.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{reminder.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{reminder.time}</span>
                      <span>•</span>
                      <span>{reminder.frequency}</span>
                    </div>
                  </div>
                </div>
                <Switch
                  checked={reminder.enabled}
                  onCheckedChange={() => toggleVoiceReminder(reminder.id)}
                />
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Voice Reminder
          </Button>
        </div>

        {/* Symptom Alerts */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber-100">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Health Pattern Alerts</h3>
              <p className="text-sm text-muted-foreground">Get notified of concerning patterns</p>
            </div>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-amber-100">
                    <Bell className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{alert.name}</p>
                    <p className="text-xs text-muted-foreground">Trigger: {alert.condition}</p>
                  </div>
                </div>
                <Switch
                  checked={alert.enabled}
                  onCheckedChange={() => toggleAlert(alert.id)}
                />
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Create Custom Alert
          </Button>
        </div>

        {/* Notification Settings */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Receive alerts on your device</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Email Reminders</p>
                <p className="text-xs text-muted-foreground">Get reminders via email</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">SMS Alerts</p>
                <p className="text-xs text-muted-foreground">Receive text message alerts</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Quiet Hours</p>
                <p className="text-xs text-muted-foreground">No notifications between 10 PM - 7 AM</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
