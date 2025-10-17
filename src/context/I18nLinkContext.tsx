'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface I18nLinkContextType {
  localizedUrl: string | null;
  setLocalizedUrl: (url: string | null) => void;
}

const I18nLinkContext = createContext<I18nLinkContextType | undefined>(undefined);

export function I18nLinkProvider({ children }: { children: ReactNode }) {
  const [localizedUrl, setLocalizedUrl] = useState<string | null>(null);

  return (
    <I18nLinkContext.Provider value={{ localizedUrl, setLocalizedUrl }}>
      {children}
    </I18nLinkContext.Provider>
  );
}

export function useI18nLink() {
  const context = useContext(I18nLinkContext);
  if (context === undefined) {
    throw new Error('useI18nLink must be used within an I18nLinkProvider');
  }
  return context;
}
