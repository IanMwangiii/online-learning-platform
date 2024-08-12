import { useState } from 'react';
import Notification from './Notification';
import { Button } from '@mui/material';

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
      <Button
        onClick={() => addNotification('This is a test notification!', 'info')}
        variant="contained"
        color="primary"
      >
        Show Notification
      </Button>

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
