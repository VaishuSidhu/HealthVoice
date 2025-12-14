import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { User, Bell, Shield, Mic, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import { getUserName, setUserName } from "@/lib/userSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const settingsSections = [
  {
    icon: User,
    title: "Profile Settings",
    description: "Manage your personal information",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure alerts and reminders",
  },
  {
    icon: Mic,
    title: "Voice Settings",
    description: "Customize voice recognition preferences",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Manage your data and security settings",
  },
  {
    icon: Globe,
    title: "Language & Region",
    description: "Set your preferred language and timezone",
  },
];

export default function Settings() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    setName(getUserName());
  }, []);

  const displayName = name ?? "Guest";
  const nameRef = useRef<HTMLInputElement | null>(null);
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
              <span className="text-xl font-semibold text-accent-foreground">{initials}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{displayName}</h3>
              <p className="text-sm text-muted-foreground">john.doe@email.com</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" ref={nameRef} defaultValue={displayName} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@email.com" />
            </div>
            <Button
              className="w-fit"
              onClick={() => {
                const newName = nameRef.current?.value || "";
                if (newName) {
                  setUserName(newName);
                  setName(newName);
                }
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Daily Reminders</p>
                <p className="text-xs text-muted-foreground">Get reminded to log your health</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Medication Alerts</p>
                <p className="text-xs text-muted-foreground">Receive medication reminders</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Weekly Summary Email</p>
                <p className="text-xs text-muted-foreground">Receive weekly health summary</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-transcribe Voice</p>
                <p className="text-xs text-muted-foreground">Automatically save voice transcriptions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Settings Navigation */}
        <div className="space-y-2">
          {settingsSections.map((section, index) => (
            <button
              key={section.title}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-muted/30 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-2 rounded-lg bg-accent">
                <section.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{section.title}</p>
                <p className="text-xs text-muted-foreground">{section.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
