import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Globe, 
  ShieldCheck, 
  Layers, 
  BookOpen, 
  ExternalLink,
  Layout,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWalletStore } from '@/stores/wallet-store';
import { useSettingsStore } from '@/stores/settings-store';
import { useNetworkStore } from '@/stores/network-store';
import { formatAddress } from '@/lib/utils';
import { DEFAULT_NETWORKS } from '@/lib/networks';
import { useSidePanelMode } from '@/hooks/use-side-panel-mode';
import { SettingsSection } from '@/components/settings/settings-section';
import { SettingsItem } from '@/components/settings/settings-item';
import { NetworkSheet } from '@/components/settings/network-sheet';
import { SecuritySheet, AUTO_LOCK_OPTIONS } from '@/components/settings/security-sheet';
import { ResetWalletDialog } from '@/components/settings/reset-wallet-dialog';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { publicKey } = useWalletStore();
  const { networkId, autoLockTimeout } = useSettingsStore();
  const { networks } = useNetworkStore();
  const { uiMode, updateMode } = useSidePanelMode();
  
  const [isResetDialogOpen, setIsResetDialogOpen] = React.useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = React.useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = React.useState(false);
  
  const currentNetwork = networks[networkId] || DEFAULT_NETWORKS.mainnet;
  const currentAutoLockLabel = AUTO_LOCK_OPTIONS.find(o => o.value === autoLockTimeout)?.label || `${autoLockTimeout} min`;

  // Placeholder for account name - in a real app this might come from a store
  const accountName = "Personal Wallet 2"; 
  
  // Placeholder for connected apps count
  const connectedAppsCount = 3;

  return (
    <div className="h-full flex flex-col space-y-6 pb-4">
      <header className="pt-6 px-1">
      </header>

      <div className="space-y-6 flex-1">
        <SettingsSection title="Current account">
          <div className="p-4 space-y-4">
            <div 
              className="bg-background/50 border rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => navigate('/dashboard')} 
            >
              <div>
                <div className="font-semibold">{accountName}</div>
                <div className="text-xs text-muted-foreground font-mono">
                  {publicKey ? formatAddress(publicKey) : 'No Wallet'}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <Button 
              className="w-full" 
              variant="secondary"
              onClick={() => {
                // Manage logic
              }}
            >
              Manage
            </Button>
          </div>
        </SettingsSection>

        <SettingsSection title="Settings">
          <SettingsItem 
            icon={Layout} 
            label="Display Mode" 
            value={uiMode === 'sidepanel' ? 'Side Panel' : 'Popup'}
            onClick={() => {
              updateMode(uiMode === 'sidepanel' ? 'popup' : 'sidepanel');
            }}
          />
          <SettingsItem 
            icon={Globe} 
            label="Network" 
            value={currentNetwork.name}
            onClick={() => setIsNetworkOpen(true)}
          />
          <SettingsItem 
            icon={ShieldCheck} 
            label="Security" 
            value={currentAutoLockLabel}
            onClick={() => setIsSecurityOpen(true)}
          />
          <SettingsItem 
            icon={Layers} 
            label="Connected zkApps" 
            value={connectedAppsCount}
            onClick={() => {
              // Open connected apps
            }}
          />
        </SettingsSection>

        <SettingsSection title="Advanced">
          <SettingsItem 
            icon={Trash2} 
            label="Reset Wallet" 
            showArrow={false}
            onClick={() => setIsResetDialogOpen(true)}
          />
        </SettingsSection>

        <SettingsSection title="About">
          <SettingsItem 
            icon={BookOpen} 
            label="FAQ" 
            rightIcon={ExternalLink}
            onClick={() => {
              window.open('https://docs.minaprotocol.com', '_blank');
            }}
          />
        </SettingsSection>
      </div>

      <ResetWalletDialog 
        open={isResetDialogOpen} 
        onOpenChange={setIsResetDialogOpen} 
      />

      <NetworkSheet 
        open={isNetworkOpen} 
        onOpenChange={setIsNetworkOpen} 
      />

      <SecuritySheet 
        open={isSecurityOpen} 
        onOpenChange={setIsSecurityOpen} 
      />
    </div>
  );
};

export default SettingsPage;
