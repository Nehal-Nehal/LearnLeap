// src/pages/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/useAuth'; // ✅ Make sure this points to your actual AuthPro

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // for programmatic routing
  const { signInWithCredentials } = useAuth(); // ✅ Move this INSIDE the component

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithCredentials(username, password);
      navigate('/'); // ✅ Route to homepage after successful login
    } catch (error) {
      console.error("Login Error Trace:", error);
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred";
      alert("Login failed: " + errorMessage);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="name"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <Link
        to="/register"
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </Link>

      </form>
    </div>
  );
};

export default Login;
