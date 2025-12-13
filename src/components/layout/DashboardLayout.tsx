import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-8">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Hello, John</h2>
            <p className="text-sm text-muted-foreground">Here's a summary of your recent health activity</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-destructive border-2 border-card" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-accent">
              <User className="h-5 w-5 text-accent-foreground" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
