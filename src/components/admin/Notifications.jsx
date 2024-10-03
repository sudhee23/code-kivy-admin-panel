import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Notifications.module.css';

const API_URL = 'http://localhost:5000/api/notification/';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState('');

  useEffect(() => {
    // Fetch existing notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(API_URL);
        setNotifications(response.data.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleSendNotification = async () => {
    try {
      await axios.post(`${API_URL}send`, { message: newNotification });
      setNewNotification('');
      // Fetch updated notifications after sending
      const response = await axios.get(API_URL);
      setNotifications(response.data.data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div className={styles['notifications-container']}>
      <h2>Notifications</h2>

      {/* List of notifications */}
      <div className={styles['notifications-list']}>
        {notifications.map((notification) => (
          <div key={notification._id} className={styles['notification-item']}>
            {notification.message}
          </div>
        ))}
      </div>

      {/* Send new notification */}
      <div className={styles['send-notification']}>
        <textarea
          value={newNotification}
          onChange={(e) => setNewNotification(e.target.value)}
          placeholder="Enter notification message"
        ></textarea>
        <button onClick={handleSendNotification} className={styles['send-btn']}>
          Send Notification
        </button>
      </div>
    </div>
  );
};

export default Notifications;
