import { createContext, useState} from 'react';
import PropTypes from 'prop-types';
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

// Define PropTypes for NotificationProvider
NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export the `useNotification` hook


export default NotificationProvider;
