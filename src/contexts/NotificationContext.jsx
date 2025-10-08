// src/contexts/NotificationContext.jsx
import { createContext, useState, useContext } from "react";

const NotificationContext = createContext();


export function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showNotification = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000); // auto-hide after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ message, showNotification }}>
      {children}

      {/* Notification UI (visible globally) */}
      {message && (
        <div className="notification" >
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
