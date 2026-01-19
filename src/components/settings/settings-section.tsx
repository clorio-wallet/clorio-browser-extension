import React from 'react';

export const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-2">
    <h2 className="text-lg font-medium px-1">{title}</h2>
    <div className="bg-card/50 border rounded-xl overflow-hidden">
      {children}
    </div>
  </div>
);
