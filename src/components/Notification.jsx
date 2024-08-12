import React, { createContext, useState, useContext } from 'react';
import Notification from './Notification';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, severity) => {
    setNotifications([...notifications, { message, severity }]);
  };

  const handleClose = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          open={true}
          message={notification.message}
          severity={notification.severity}
          onClose={() => handleClose(index)}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
