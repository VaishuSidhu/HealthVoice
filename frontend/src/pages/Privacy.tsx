import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  FileCheck, 
  Heart, 
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All your health data is encrypted both in transit and at rest using AES-256 encryption.",
  },
  {
    icon: Database,
    title: "Secure Data Storage",
    description: "Your information is stored in HIPAA-compliant data centers with multiple layers of protection.",
  },
  {
    icon: Eye,
    title: "Privacy by Design",
    description: "We collect only the data necessary to provide our services. You control what you share.",
  },
  {
    icon: FileCheck,
    title: "HIPAA Compliant",
    description: "We adhere to strict healthcare data protection standards required by HIPAA regulations.",
  },
];

const dataRights = [
  "Access all your stored health data at any time",
  "Download a complete copy of your data",
  "Request deletion of your account and all data",
  "Opt out of non-essential data collection",
  "Control who can access your health reports",
  "Revoke access to shared data at any time",
];

const dataUsage = [
  {
    purpose: "Health Tracking",
    description: "Your voice recordings and health logs are processed to generate insights and reports.",
    required: true,
  },
  {
    purpose: "Service Improvement",
    description: "Anonymized data may be used to improve our voice recognition and health analysis algorithms.",
    required: false,
  },
  {
    purpose: "Personalization",
    description: "We use your health patterns to provide personalized recommendations and alerts.",
    required: false,
  },
];

export default function Privacy() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Privacy & Data Security</h1>
            <p className="text-sm text-muted-foreground">How we protect your health information</p>
          </div>
        </div>

        {/* Trust Banner */}
        <div className="rounded-2xl bg-primary/5 border border-primary/20 p-6 animate-fade-in">
          <div className="flex items-start gap-4">
            <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Your Privacy is Our Priority</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                At HealthVoice, we understand that health data is deeply personal. We've built our platform 
                with privacy and security at its core. Your data belongs to you, and we're committed to 
                keeping it safe and under your control.
              </p>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-6">Security Features</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="p-4 rounded-xl bg-muted/50 border border-border/50"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-medium text-foreground">{feature.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Your Data Rights */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in" style={{ animationDelay: "50ms" }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Data Rights</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You have complete control over your health data. Here's what you can do:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {dataRights.map((right, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{right}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" size="sm">
              Download My Data
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
              Delete My Account
            </Button>
          </div>
        </div>

        {/* How We Use Your Data */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">How We Use Your Data</h3>
          <div className="space-y-4">
            {dataUsage.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 rounded-xl bg-muted/50 border border-border/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground">{item.purpose}</h4>
                    {item.required && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                {!item.required && (
                  <Button variant="ghost" size="sm" className="text-xs">
                    Manage
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Third-Party Sharing */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in" style={{ animationDelay: "150ms" }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Third-Party Sharing</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <h4 className="text-sm font-medium text-green-800">We Never Sell Your Data</h4>
              </div>
              <p className="text-xs text-green-700">
                Your health information is never sold to advertisers, data brokers, or any third parties.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              We only share your data when:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                You explicitly choose to share reports with your healthcare provider
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Required by law or valid legal process
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                With service providers who help us operate (under strict data protection agreements)
              </li>
            </ul>
          </div>
        </div>

        {/* Contact & Resources */}
        <div className="rounded-2xl bg-card border border-border p-6 card-shadow animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Questions or Concerns?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you have any questions about our privacy practices or want to exercise your data rights, 
            we're here to help.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              Contact Privacy Team
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/privacy-policy">
                Full Privacy Policy
                <ExternalLink className="h-3 w-3 ml-2" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/terms">
                Terms of Service
                <ExternalLink className="h-3 w-3 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
