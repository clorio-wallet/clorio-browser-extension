import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSessionStore } from '@/stores/session-store';
import { storage } from '@/lib/storage';
import Dock from '@/components/ui/dock';
import { Home, Settings } from 'lucide-react';
import { useSidePanelMode } from '@/hooks/use-side-panel-mode';
import { cn } from '@/lib/utils';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, setHasVault } = useSessionStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { uiMode } = useSidePanelMode();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        // Check if vault exists to decide where to redirect
        const vault = await storage.get('clorio_vault');
        if (vault) {
          setHasVault(true);
          navigate('/login');
        } else {
          setHasVault(false);
          navigate('/welcome');
        }
      }
    };

    checkAuth();
  }, [isAuthenticated, navigate, setHasVault]);

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      onClick: () => navigate('/dashboard'),
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
  ];

  const activeLabel = navItems.find((item) => {
    if (item.label === 'Home') return location.pathname === '/dashboard';
    if (item.label === 'Settings') return location.pathname.startsWith('/settings');
    return false;
  })?.label;

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto pb-24">{children}</div>
      <div
        className={cn(
          'fixed bottom-4 z-50 transition-all duration-300',
          uiMode === 'popup'
            ? 'left-1/2 -translate-x-1/2 w-full max-w-[350px] px-4'
            : 'left-0 right-0 px-4'
        )}
      >
        <Dock items={navItems} activeLabel={activeLabel} className="py-2" />
      </div>
    </div>
  );
};
