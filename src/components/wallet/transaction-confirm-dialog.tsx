import * as React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Separator,
} from "@/components/ui";
import { AddressDisplay } from "./address-display";
import { NetworkBadge } from "./network-badge";
import { HoldToConfirmButton } from "./hold-to-confirm-button";

interface TransactionData {
  to: string;
  amount: string;
  symbol: string;
  fee: string;
  network: string;
  memo?: string;
}

interface TransactionConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  transaction: TransactionData;
  origin?: string;
  loading?: boolean;
}

export function TransactionConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  transaction,
  origin,
  loading = false,
}: TransactionConfirmDialogProps) {
  const total = (
    parseFloat(transaction.amount) + parseFloat(transaction.fee)
  ).toFixed(8);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        showClose={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Confirm Transaction
          </DialogTitle>
          {origin && (
            <DialogDescription className="flex items-center gap-2">
              <span>Request from:</span>
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                {origin}
              </code>
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Recipient */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">Recipient</label>
            <div className="rounded-lg bg-muted p-3">
              <AddressDisplay
                address={transaction.to}
                truncate={false}
                showCopy={true}
                className="text-sm break-all"
              />
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">Amount</label>
            <div className="text-2xl font-semibold">
              {transaction.amount}{" "}
              <span className="text-muted-foreground">{transaction.symbol}</span>
            </div>
          </div>

          {/* Memo (if present) */}
          {transaction.memo && (
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">Memo</label>
              <div className="rounded-lg bg-muted p-3 text-sm">
                {transaction.memo}
              </div>
            </div>
          )}

          <Separator />

          {/* Fee and Total */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network Fee</span>
              <span>
                {transaction.fee} {transaction.symbol}
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>
                {total} {transaction.symbol}
              </span>
            </div>
          </div>

          {/* Network */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Network</span>
            <NetworkBadge network={transaction.network} />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <HoldToConfirmButton
            onConfirm={onConfirm}
            holdDuration={2000}
            disabled={loading}
          >
            {loading ? "Processing..." : "Hold to Confirm"}
          </HoldToConfirmButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
