import { useState } from "react";
import { Mic, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { healthLogApi } from "@/lib/api";
import { toast } from "sonner";
import { getUserId } from "@/lib/userSession";

type RecordingState = "idle" | "recording" | "processing";

export function VoiceLoggingCard() {
  const [state, setState] = useState<RecordingState>("idle");
  const [transcript, setTranscript] = useState("");
  const [lastLog, setLastLog] = useState<{summary: string; timestamp: string} | null>(null);

  const handleClick = async () => {
    if (state === "idle") {
      setState("recording");
      // In a real app, this would use Web Speech API or connect to SpeakSpace
      // For now, we'll use a prompt to enter text
      const userInput = prompt("Enter your health update (or paste voice transcript):");
      if (userInput && userInput.trim()) {
        setTranscript(userInput.trim());
        setState("processing");
        try {
          const userId = getUserId();
          const result = await healthLogApi.create(userInput.trim(), userId);
          setLastLog({
            summary: result.summary,
            timestamp: new Date().toLocaleTimeString()
          });
          toast.success("Health log created successfully!", {
            description: result.summary,
            duration: 5000,
          });
          // Refresh all dashboard components
          window.dispatchEvent(new Event("healthLogUpdated"));
          // Clear transcript after a delay
          setTimeout(() => {
            setTranscript("");
          }, 3000);
        } catch (error) {
          toast.error("Failed to create health log", {
            description: error instanceof Error ? error.message : "Unknown error",
          });
          setTranscript("");
        } finally {
          setState("idle");
        }
      } else {
        setState("idle");
      }
    } else if (state === "recording") {
      setState("idle");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-medical-blue-dark p-8 text-primary-foreground card-shadow animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold mb-2">Add Health Update</h3>
        <p className="text-primary-foreground/80 mb-8 max-w-md">
          Record your daily health experiences using voice. We'll automatically organize your symptoms, medications, and insights.
        </p>

        {/* Microphone Button */}
        <div className="relative mb-6">
          {/* Ripple Effect for Recording */}
          {state === "recording" && (
            <>
              <div className="absolute inset-0 rounded-full bg-primary-foreground/20 animate-ripple" />
              <div className="absolute inset-0 rounded-full bg-primary-foreground/20 animate-ripple" style={{ animationDelay: "0.5s" }} />
            </>
          )}

          <button
            onClick={handleClick}
            disabled={state === "processing"}
            className={cn(
              "relative flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300",
              "bg-primary-foreground/20 hover:bg-primary-foreground/30",
              "border-4 border-primary-foreground/40",
              state === "recording" && "animate-pulse-glow bg-primary-foreground/30",
              state === "processing" && "opacity-80 cursor-not-allowed"
            )}
          >
            {state === "processing" ? (
              <Loader2 className="h-12 w-12 animate-spin" />
            ) : (
              <Mic className={cn("h-12 w-12", state === "recording" && "animate-pulse")} />
            )}
          </button>
        </div>

        {/* Status Text */}
        <p className="text-sm font-medium mb-4">
          {state === "idle" && "Tap and speak about your health today"}
          {state === "recording" && "Listening... Tap again to stop"}
          {state === "processing" && "Analyzing your voice input..."}
        </p>

        {/* Show user input and last log details */}
        {transcript && (
          <div className="mt-4 w-full max-w-md bg-primary-foreground/10 rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-xs font-semibold text-primary-foreground/80 mb-2">Your Input:</p>
            <p className="text-sm text-primary-foreground/90 italic">"{transcript}"</p>
          </div>
        )}

        {lastLog && !transcript && (
          <div className="mt-4 w-full max-w-md bg-primary-foreground/10 rounded-lg p-4 border border-primary-foreground/20">
            <p className="text-xs font-semibold text-primary-foreground/80 mb-2">
              Last Logged ({lastLog.timestamp}):
            </p>
            <p className="text-sm text-primary-foreground/90">{lastLog.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
