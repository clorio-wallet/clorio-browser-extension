import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useSessionStore } from '@/stores/session-store';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ResetWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResetWalletDialog: React.FC<ResetWalletDialogProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const { resetWallet } = useSessionStore();
  const { toast } = useToast();

  const handleResetWallet = async () => {
    await resetWallet();
    toast({
      title: 'Wallet Reset',
      description: 'Your wallet has been removed from this device.',
    });
    navigate('/welcome');
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Reset Wallet?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete your wallet from this device.
            Make sure you have backed up your mnemonic phrase or private key.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleResetWallet}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Reset Wallet
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
