import React, { useState } from 'react';
import Notification from './Notification';

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, severity) => {
    setNotifications([...notifications, { message, severity }]);
  };

  const handleClose = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <>
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          open={true}
          message={notification.message}
          severity={notification.severity}
          onClose={() => handleClose(index)}
        />
      ))}
    </>
  );
};

export default NotificationManager;