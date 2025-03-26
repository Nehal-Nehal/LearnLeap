// src/pages/RegistrationPage.tsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerify, setPasswordVerify] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [isStudent, setIsStudent] = useState<boolean>(true);

  const navigate = useNavigate();

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordVerify) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/register", {
        username,
        email,
        password,
        age,
        is_student: isStudent,
      });

      alert(response.data.message || "Registration Successful!");
    } catch (error: any) {
      alert("Registration failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div>
      <h2>Account Registration</h2>
      <p>Key In Your Details</p>
      <form onSubmit={registerUser}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={passwordVerify}
          onChange={(e) => setPasswordVerify(e.target.value)}
          placeholder="Re-enter Password"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Age"
          required
        />

        <label>
          <input
            type="checkbox"
            checked={isStudent}
            onChange={(e) => setIsStudent(e.target.checked)}
          />
          Are you a student?
        </label>

        <div>
          <button type="button" onClick={() => navigate("/login")}>
            Go Back To Login Page
          </button>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
