import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * HealthVoice Logo Component
 * Combines a stethoscope (medical trust) and microphone (voice-first interaction)
 * Uses medical blue (#2563EB) and white colors for a professional, calm appearance
 */
export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 48 48"
        className={cn(sizeClasses[size])}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stethoscope tubing - forms the base */}
        <path
          d="M24 6C20 6 18 8 18 12V16C18 18 16 20 14 20H12C10 20 8 22 8 24V30C8 34 12 38 16 38C20 38 24 34 24 30V24C24 22 22 20 20 20H18C16 20 14 18 14 16V12C14 10 16 8 18 8H24C26 8 28 10 28 12V16C28 18 26 20 24 20H22C20 20 18 22 18 24V30C18 34 22 38 26 38C30 38 34 34 34 30V24C34 22 32 20 30 20H28C26 20 24 18 24 16V12C24 8 20 6 24 6Z"
          fill="#2563EB"
        />
        {/* Stethoscope chest pieces */}
        <circle cx="14" cy="38" r="4" fill="#2563EB" />
        <circle cx="34" cy="38" r="4" fill="#2563EB" />
        
        {/* Microphone integrated in center - Voice symbol */}
        <circle cx="24" cy="18" r="6" fill="white" />
        <rect x="22" y="24" width="4" height="6" rx="1" fill="white" />
        <path
          d="M20 32L24 36L28 32"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

