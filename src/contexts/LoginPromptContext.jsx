import { createContext, useContext, useState } from "react";

const LoginPromptContext = createContext();

export const useLoginPrompt = () => useContext(LoginPromptContext);

export const LoginPromptProvider = ({ children }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  const requireLogin = (user, onAllowed) => {
    if (user) {
      onAllowed();
    } else {
      setShowPrompt(true);
    }
  };

  const value = {
    showPrompt,
    setShowPrompt,
    requireLogin,
  };

  return (
    <LoginPromptContext.Provider value={value}>
      {children}
    </LoginPromptContext.Provider>
  );
};
