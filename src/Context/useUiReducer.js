import React, { createContext, useContext, useState } from "react";

const uiContext = createContext();

export function ProvideUi({ children }) {
  const data = useProviderUi();
  return <uiContext.Provider value={data}>{children}</uiContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useUI = () => {
  return useContext(uiContext);
};

const useProviderUi = () => {
  const [isPostModalOpen, setPostModal] = useState(false);

  const postModalToggler = () => {
    setPostModal(prev => !prev);
  };

  return { isPostModalOpen, postModalToggler };
};
