import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { validateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { useSessionStore } from '@/stores/session-store';
import { CryptoService } from '@/lib/crypto';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { SeedPhraseInput } from '@/components/wallet/seed-phrase-input';

export const ImportWalletPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tempPassword, setHasVault, setIsAuthenticated } = useSessionStore();
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [isImporting, setIsImporting] = useState(false);

  const handleFinish = async () => {
    if (!tempPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Password not set. Please restart onboarding.',
      });
      navigate('/');
      return;
    }

    const mnemonicString = mnemonic
      .map((w) => w.trim().toLowerCase())
      .join(' ');
    if (!validateMnemonic(mnemonicString, wordlist)) {
      toast({
        variant: 'destructive',
        title: 'Invalid Seed Phrase',
        description: 'Please check your seed phrase and try again.',
      });
      return;
    }

    setIsImporting(true);
    try {
      // Encrypt the mnemonic
      const encryptedData = await CryptoService.encrypt(
        mnemonicString,
        tempPassword,
      );

      // Save vault
      await storage.set('clorio_vault', {
        encryptedSeed: encryptedData.ciphertext,
        salt: encryptedData.salt,
        iv: encryptedData.iv,
        version: 1,
        createdAt: Date.now(),
      });

      setHasVault(true);
      setIsAuthenticated(true);

      toast({
        title: 'Wallet Imported',
        description: 'Your wallet has been successfully imported.',
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to import wallet:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to import wallet.',
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 py-4">
      <div className="space-y-2">
        <h1 className="text-xl font-bold">Import Wallet</h1>
        <p className="text-sm text-muted-foreground">
          Enter your 12-word Secret Recovery Phrase.
        </p>
      </div>

      <SeedPhraseInput length={12} onChange={setMnemonic} />

      <div className="pt-4 flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button
          className="flex-1"
          disabled={
            mnemonic.filter((w) => w.length > 0).length !== 12 || isImporting
          }
          onClick={handleFinish}
        >
          {isImporting ? 'Importing...' : 'Import Wallet'}
        </Button>
      </div>
    </div>
  );
};
