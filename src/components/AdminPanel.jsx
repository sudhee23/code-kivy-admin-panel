import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './admin/AdminSidebar';  // Import the sidebar

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
