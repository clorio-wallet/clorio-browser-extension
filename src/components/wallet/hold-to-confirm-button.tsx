import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";

interface HoldToConfirmButtonProps {
  onConfirm: () => void;
  holdDuration?: number;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "default" | "destructive";
  className?: string;
}

export function HoldToConfirmButton({
  onConfirm,
  holdDuration = 2000,
  children,
  disabled = false,
  variant = "default",
  className,
}: HoldToConfirmButtonProps) {
  const [holding, setHolding] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = React.useRef<number>(0);

  const handleEnd = React.useCallback((completed = false) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setHolding(false);
    setProgress(0);

    if (completed) {
      onConfirm();
    }
  }, [onConfirm]);

  const handleStart = React.useCallback(() => {
    if (disabled) return;
    setHolding(true);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / holdDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        handleEnd(true);
      }
    }, 16);
  }, [disabled, holdDuration, handleEnd]);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <button
      onMouseDown={handleStart}
      onMouseUp={() => handleEnd(false)}
      onMouseLeave={() => handleEnd(false)}
      onTouchStart={handleStart}
      onTouchEnd={() => handleEnd(false)}
      disabled={disabled}
      className={cn(
        buttonVariants({ variant: variant === "destructive" ? "destructive" : "default" }),
        "relative overflow-hidden select-none",
        className
      )}
      aria-label={`Hold for ${holdDuration / 1000} seconds to confirm`}
    >
      {/* Progress background */}
      <div
        className={cn(
          "absolute inset-0 transition-none",
          variant === "destructive" ? "bg-white/20" : "bg-white/20"
        )}
        style={{
          width: `${progress}%`,
          opacity: holding ? 1 : 0,
        }}
      />

      <span className="relative z-10 flex items-center gap-2">
        {holding ? (
          <>
            <span className="text-xs tabular-nums">{Math.round(progress)}%</span>
            <span>Release to cancel</span>
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}
