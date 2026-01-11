import * as React from "react";
import { Coins } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatBalance } from "@/lib/utils";

interface AssetCardProps {
  name: string;
  symbol: string;
  balance: number;
  price?: number;
  change24h?: number;
  icon?: string;
  onClick?: () => void;
}

export function AssetCard({
  name,
  symbol,
  balance,
  price,
  change24h,
  icon,
  onClick,
}: AssetCardProps) {
  const value = price ? balance * price : 0;
  const isPositive = change24h ? change24h >= 0 : true;

  return (
    <Card 
      className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            {icon ? (
              <img src={icon} alt={name} className="h-6 w-6" />
            ) : (
              <Coins className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <div className="font-medium text-sm">{name}</div>
            <div className="text-xs text-muted-foreground">{symbol}</div>
          </div>
        </div>

        <div className="text-right">
          <div className="font-medium text-sm">
            {formatBalance(balance)} {symbol}
          </div>
          {price && (
            <div className="flex items-center justify-end gap-2 text-xs">
              <span className="text-muted-foreground">
                ${formatBalance(value)}
              </span>
              {change24h && (
                <span className={isPositive ? "text-green-600" : "text-red-600"}>
                  {isPositive ? "+" : ""}{change24h}%
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
