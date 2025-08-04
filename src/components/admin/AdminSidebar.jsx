import React, { useState } from 'react';
import { IoHomeOutline, IoDocumentTextOutline, IoPersonOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { BsHddStack, BsEnvelope } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import styles from './AdminSidebar.module.css';
import ConfirmationModal from '../ConfirmationModal';  // Import the modal

const AdminSidebar = () => {
  const [activeItem, setActiveItem] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <IoHomeOutline />, path: '/admin/dashboard' },
    { name: 'Register User', icon: <IoPersonOutline />, path: '/admin/register-user' },
    { name: 'Courses', icon: <IoDocumentTextOutline />, path: '/admin/courses' },
    { name: 'Students', icon: <AiOutlineTeam />, path: '/admin/students' },
    { name: 'Notifications', icon: <BsHddStack />, path: '/admin/notifications' },
    { name: 'Contacts', icon: <BsEnvelope />, path: '/admin/contacts' }
  ];

  const handleItemClick = (name, path) => {
    if (name === 'Logout') {
      setIsModalOpen(true);  // Open the modal when "Logout" is clicked
    } else {
      setActiveItem(name);
      navigate(path);  // Navigate for all other menu items
    }
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('authToken');  // Remove auth token on logout confirmation
    setIsModalOpen(false);
    navigate('/');  // Redirect to login page after logout
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className={location.pathname === item.path ? styles.active : ''} 
            onClick={() => handleItemClick(item.name, item.path)}
          >
            <Link to={item.path} className={`${styles.link} d-flex align-items-center`}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.text}>{item.name}</span>
            </Link>
          </li>
        ))}

        {/* Special handling for Logout */}
        <li 
          className={styles.logoutItem}
          onClick={() => handleItemClick('Logout')}
        >
          <div className={`${styles.link} d-flex align-items-center`}>
            <span className={styles.icon}><CiLogout /></span>
            <span className={styles.text}>Logout</span>
          </div>
        </li>
      </ul>
      {/* Logout Confirmation Modal */}
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmLogout} 
        message={"Are you sure want to Log Out?"}
        title = "Confirm Logout"
      />
    </div>
  );
};

export default AdminSidebar;
