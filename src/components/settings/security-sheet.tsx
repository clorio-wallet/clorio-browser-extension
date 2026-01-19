import React from 'react';
import { Check } from 'lucide-react';
import { useSettingsStore } from '@/stores/settings-store';
import { useSessionStore } from '@/stores/session-store';
import { sessionStorage } from '@/lib/storage';
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

export const AUTO_LOCK_OPTIONS = [
  { label: 'On window close', value: 0 },
  { label: '5 minutes', value: 5 },
  { label: '15 minutes', value: 15 },
  { label: '30 minutes', value: 30 },
  { label: '1 hour', value: 60 },
  { label: 'Never', value: -1 },
];

interface SecuritySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SecuritySheet: React.FC<SecuritySheetProps> = ({ open, onOpenChange }) => {
  const { autoLockTimeout, setAutoLockTimeout } = useSettingsStore();
  const { tempPassword, isAuthenticated } = useSessionStore();

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>Security Settings</BottomSheetTitle>
          <BottomSheetDescription>
            Manage your wallet security preferences.
          </BottomSheetDescription>
        </BottomSheetHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Auto-lock Timer</h3>
            <div className="grid gap-2">
              {AUTO_LOCK_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                    autoLockTimeout === option.value
                      ? "bg-accent border-primary/50"
                      : "hover:bg-accent/50 border-transparent"
                  )}
                  onClick={async () => {
                    setAutoLockTimeout(option.value);
                    onOpenChange(false);
                    
                    // Update persistence immediately
                    if (isAuthenticated && tempPassword) {
                      if (option.value !== 0) {
                        await sessionStorage.set('clorio_session', {
                          password: tempPassword,
                          timestamp: Date.now()
                        });
                      } else {
                        await sessionStorage.remove('clorio_session');
                      }
                    }
                  }}
                >
                  <span className="text-sm">{option.label}</span>
                  {autoLockTimeout === option.value && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <BottomSheetFooter>
          <BottomSheetClose asChild>
            <Button variant="outline">Close</Button>
          </BottomSheetClose>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  );
};
