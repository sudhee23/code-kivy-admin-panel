import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Contacts.module.css';

const API_URL = 'http://localhost:5000/api/contact';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch contact form data
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(API_URL,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setContacts(response.data.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className={styles['contacts-container']}>
      <h2>Contacts Management</h2>

      {/* Display contact form submissions */}
      <table className={styles['contacts-table']}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No contact messages available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
