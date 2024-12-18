import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/users/register', formData);
        toast.success(response.data.message);

        // Redirect to OTP verification page with email state
        navigate('/verify-otp', { state: { email: formData.email } });
    } catch (error) {
        toast.error(error.response?.data?.message || 'Registration failed');
    }
};


  return (
    <div className="signup-container">
      <ToastContainer />
      <h2 className="signup-title">Create an Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="signup-input"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="signup-input"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="signup-input"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="contactNumber">Contact Number</label>
        <input
          type="text"
          id="contactNumber"
          className="signup-input"
          placeholder="Enter your contact number"
          value={formData.contactNumber}
          onChange={handleChange}
        />

        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>

      <p className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default SignUp;
