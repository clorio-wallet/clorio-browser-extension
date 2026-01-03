import * as React from "react";
import { Eye, EyeOff, Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, Label } from "@/components/ui";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  showStrength?: boolean;
  label?: string;
  error?: string;
  onStrengthChange?: (strength: number) => void;
}

export function PasswordInput({
  showStrength = false,
  label,
  error,
  onStrengthChange,
  className,
  id,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);
  const [strength, setStrength] = React.useState(0);
  const generatedId = React.useId();
  const inputId = id || generatedId;

  const calculateStrength = React.useCallback((password: string): number => {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    return Math.min(score, 5);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStrength = calculateStrength(e.target.value);
    setStrength(newStrength);
    onStrengthChange?.(newStrength);
    props.onChange?.(e);
  };

  const strengthConfig = [
    { label: "Very Weak", color: "bg-destructive", icon: ShieldAlert },
    { label: "Weak", color: "bg-destructive", icon: ShieldAlert },
    { label: "Fair", color: "bg-warning", icon: Shield },
    { label: "Good", color: "bg-success/70", icon: Shield },
    { label: "Strong", color: "bg-success", icon: ShieldCheck },
  ];

  const currentStrength = strengthConfig[strength - 1];

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      
      <div className="relative">
        <Input
          {...props}
          id={inputId}
          type={visible ? "text" : "password"}
          onChange={handleChange}
          error={!!error}
          className={cn("pr-10", className)}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "text-muted-foreground hover:text-foreground transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          )}
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {showStrength && props.value && (
        <div className="space-y-1.5">
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i < strength ? currentStrength?.color : "bg-muted"
                )}
              />
            ))}
          </div>
          {currentStrength && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <currentStrength.icon className="h-3 w-3" />
              <span>{currentStrength.label}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
