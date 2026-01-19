import React from 'react';
import { Check } from 'lucide-react';
import { useNetworkStore } from '@/stores/network-store';
import { useSettingsStore } from '@/stores/settings-store';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetClose,
} from '@/components/ui/bottom-sheet';

interface NetworkSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NetworkSheet: React.FC<NetworkSheetProps> = ({ open, onOpenChange }) => {
  const { networks } = useNetworkStore();
  const { networkId, setNetworkId } = useSettingsStore();
  const { toast } = useToast();

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>Select Network</BottomSheetTitle>
          <BottomSheetDescription>
            Choose the Mina network you want to connect to.
          </BottomSheetDescription>
        </BottomSheetHeader>
        <div className="p-4 space-y-2">
          {Object.values(networks).map((net) => (
            <div
              key={net.label}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                networkId === net.label
                  ? "bg-accent border-primary/50"
                  : "hover:bg-accent/50 border-transparent"
              )}
              onClick={() => {
                setNetworkId(net.label);
                onOpenChange(false);
                toast({ description: `Switched to ${net.name}` });
              }}
            >
              <div className="flex flex-col">
                <span className="font-medium">{net.name}</span>
                <span className="text-xs text-muted-foreground">{net.url}</span>
              </div>
              {networkId === net.label && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
          ))}
        </div>
        <BottomSheetFooter>
          <BottomSheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </BottomSheetClose>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  );
};
