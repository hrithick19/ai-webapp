import { createContext, useContext, useMemo, useCallback } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const contextValue = useMemo(() => ({
    // Memoized values and functions
  }), []);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}; 