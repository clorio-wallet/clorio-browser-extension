import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useSidePanelMode } from '@/hooks/use-side-panel-mode';
import PlaygroundPage from './Playground';

const Layout = () => {
  const { uiMode } = useSidePanelMode();

  return (
    <div
      className={cn(
        'h-full min-h-screen bg-background text-foreground flex flex-col mx-auto transition-all duration-300 ease-in-out',
        uiMode === 'popup'
          ? 'w-full max-w-[350px] shadow-2xl my-auto'
          : 'w-full',
      )}
    >
      <main className="flex-1 overflow-auto relative px-4">
        <Outlet />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PlaygroundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
