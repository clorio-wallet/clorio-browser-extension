import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";

type NetworkType = "mainnet" | "testnet" | "devnet" | "local";

interface NetworkBadgeProps {
  network: NetworkType | string;
  showDot?: boolean;
  className?: string;
}

const networkConfig: Record<NetworkType, { label: string; variant: "success" | "warning" | "secondary" | "outline" }> = {
  mainnet: { label: "Mainnet", variant: "success" },
  testnet: { label: "Testnet", variant: "warning" },
  devnet: { label: "Devnet", variant: "secondary" },
  local: { label: "Local", variant: "outline" },
};

export function NetworkBadge({ network, showDot = true, className }: NetworkBadgeProps) {
  const config = networkConfig[network as NetworkType] || {
    label: network,
    variant: "outline" as const,
  };

  return (
    <Badge variant={config.variant} className={cn("gap-1.5", className)}>
      {showDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            config.variant === "success" && "bg-success-foreground",
            config.variant === "warning" && "bg-warning-foreground",
            config.variant === "secondary" && "bg-secondary-foreground",
            config.variant === "outline" && "bg-foreground"
          )}
        />
      )}
      {config.label}
    </Badge>
  );
}
