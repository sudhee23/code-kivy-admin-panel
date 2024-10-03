import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import RegisterAdmin from './components/admin/RegisterAdmin';
import AdminDashboard from './components/admin/AdminDashboard';
import CourseOperations from './components/admin/CourseOperations';
import RegisteredStudents from './components/admin/RegisteredStudents';
import Notifications from './components/admin/Notifications';
import Contacts from './components/admin/Contacts';
import Login from './pages/Login';  // Authentication page
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login Page */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes: Accessible only if logged in */}
        <Route 
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        >

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="register-user" element={<RegisterAdmin />} />
          <Route path="courses" element={<CourseOperations />} />
          <Route path="students" element={<RegisteredStudents />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
