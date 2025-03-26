// src/pages/RegistrationPage.tsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVerify, setPasswordVerify] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [isStudent, setIsStudent] = useState<boolean>(true);

  const navigate = useNavigate();

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (password !== passwordVerify) {
      alert("Passwords do not match!");
      return;
    }
  
    const parsedAge = parseInt(age);
    if (!parsedAge || parsedAge <= 0) {
      alert("Please enter a valid age.");
      return;
    }
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/register", {
        username,
        email,
        password,
        age: parsedAge, // ✅ send parsed number
        is_student: isStudent,
      });
  
      alert(response.data.message || "Registration Successful!");
      navigate("/login");
    } catch (error: any) {
      alert("Registration failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Account Registration</h2>
        <p className="text-muted-foreground text-sm">Key in your details to create an account</p>
      </div>

      <form onSubmit={registerUser} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passwordVerify">Re-enter Password</Label>
          <Input
            id="passwordVerify"
            type="password"
            value={passwordVerify}
            onChange={(e) => setPasswordVerify(e.target.value)}
            placeholder="Re-enter password"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            required
            min={6} 
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isStudent"
            checked={isStudent}
            onCheckedChange={(checked) => setIsStudent(!!checked)}
          />
          <Label htmlFor="isStudent">Are you a student?</Label>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" type="button" onClick={() => navigate("/login")}>
            Back to Login
          </Button>
          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
