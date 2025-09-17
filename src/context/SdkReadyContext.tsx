'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SdkReadyContextType {
  isSdkReady: boolean;
  setSdkReady: (isReady: boolean) => void;
}

const SdkReadyContext = createContext<SdkReadyContextType | undefined>(undefined);

export const SdkReadyProvider = ({ children }: { children: ReactNode }) => {
  const [isSdkReady, setSdkReady] = useState(false);
  return (
    <SdkReadyContext.Provider value={{ isSdkReady, setSdkReady }}>
      {children}
    </SdkReadyContext.Provider>
  );
};

export const useSdkReady = () => {
  const context = useContext(SdkReadyContext);
  if (context === undefined) {
    throw new Error('useSdkReady must be used within a SdkReadyProvider');
  }
  return context;
};