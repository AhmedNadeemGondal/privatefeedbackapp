// contexts/OverlayContext.tsx
"use client"; // This directive marks the file as a Client Component

import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the shape of the context value
interface OverlayContextType {
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
}

// 2. Create the Context
// We provide a default value that matches the interface.
// The default setShowOverlay is an empty function, as it will be overridden by the Provider.
const OverlayContext = createContext<OverlayContextType>({
  showOverlay: false,
  setShowOverlay: () => {}, // No-op function by default
});

// 3. Create the Provider Component
interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({
  children,
}) => {
  const [showOverlay, setShowOverlay] = useState(true); // State to control overlay visibility

  // The value that will be provided to consumers of this context
  const contextValue = {
    showOverlay,
    setShowOverlay,
  };

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
    </OverlayContext.Provider>
  );
};

// 4. Create a custom hook for convenience (optional but recommended)
export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};
