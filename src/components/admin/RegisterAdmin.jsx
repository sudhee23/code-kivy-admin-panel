import React, { useState } from "react";
import axios from "axios";
import styles from './RegisterAdmin.module.css';

// const API_URL = process.env.REACT_APP_API_URL;

const RegisterAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5173/api/admin/register", {
        name,
        email,
        password,
      });
      alert("Admin registered successfully!");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className={styles['register-container']}>
      <form onSubmit={handleRegister}>
        <h2>Register Admin</h2>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        </div>
        
        
        <button type="submit" className="btn btn-accent">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
