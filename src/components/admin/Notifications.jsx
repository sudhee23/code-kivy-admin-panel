import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Notifications.module.css";
import ConfirmationModal from "../ConfirmationModal";

const API_URL = "http://localhost:5000/api/notification/";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState("");
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);


  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      alert("Failed to fetch notifications.");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSendNotification = async () => {
    if (!newNotification.trim()) {
      alert("Notification message cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${API_URL}send`,
        { message: newNotification },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewNotification("");
      // Fetch updated notifications after sending
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data.data);
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Failed to send notification.");
    }
  };

  const handleDeleteNotification = (notification) => {
    setNotificationToDelete(notification);
  };

  const confirmDeleteNotification = async () => {
    if (!notificationToDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}${notificationToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotifications();
      setNotificationToDelete(null);
    } catch (error) {
      console.error("Error deleting notification:", error);
      alert("Failed to delete notification.");
    }
  };

  const handleDeleteAllNotifications = () => {
    setIsDeleteAllModalOpen(true);
  };

  const confirmDeleteAllNotifications = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Clear all notifications from the state
      setNotifications([]);
      setIsDeleteAllModalOpen(false);
    } catch (error) {
      console.error("Error deleting all notifications:", error);
      alert("Failed to delete all notifications.");
    }
  };

  return (
    <div className={styles["notifications-container"]}>
      <h2>Notifications</h2>

      {/* Send new notification */}
      <div className={styles["send-notification"]}>
        <textarea
          value={newNotification}
          onChange={(e) => setNewNotification(e.target.value)}
          placeholder="Enter notification message"
          className={styles["notification-textarea"]}
        ></textarea>
        <div className={styles["button-container"]}>
          <button
            onClick={handleSendNotification}
            className="btn send-btn btn-accent"
          >
            Send Notification
          </button>
          {/* Delete All Notifications Button */}
          {notifications.length > 0 && (
            <button
              onClick={handleDeleteAllNotifications}
              className={styles["delete-all-btn"]}
            >
              Delete All Notifications
            </button>
          )}
        </div>
      </div>

      {/* List of notifications */}
      <div className={styles["notifications-list"]}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id} className={styles["notification-item"]}>
              <div className={styles["notification-message"]}>
                {notification.message}
              </div>
              <div className={styles["notification-actions"]}>
                <button
                  onClick={() => handleDeleteNotification(notification)}
                  className={styles["delete-btn"]}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles["no-notifications"]}>
            No notifications available.
          </p>
        )}
      </div>

      {/* Confirmation Modal for Deleting a Single Notification */}
      <ConfirmationModal
        isOpen={notificationToDelete}
        onClose={() => setNotificationToDelete(null)}
        onConfirm={confirmDeleteNotification}
        title="Confirm Deletion"
        message="Are you sure you want to delete this notification?"
      />

      {/* Confirmation Modal for Deleting All Notifications */}
      <ConfirmationModal
        isOpen={isDeleteAllModalOpen}
        onClose={() => setIsDeleteAllModalOpen(false)}
        onConfirm={confirmDeleteAllNotifications}
        title="Confirm Deletion"
        message="Are you sure you want to delete all notifications?"
      />
    </div>
  );
};

export default Notifications;
