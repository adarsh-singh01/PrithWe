import React, { useState } from 'react';
import axios from 'axios';
import './VerifyEmail.css';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('/api/auth/sendOTP', { email });
      if (response.data.success) {
        setOtpSent(true);
        setMessage('OTP sent to your email address');
        setError('');
      } else {
        setError('Failed to send OTP. Please try again.');
        setMessage('');
      }
    } catch (err) {
      setError('Error sending OTP. Make Sure you have Registered this mail');
      setMessage('');   
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('/api/auth/verifyOTP', { email, otp });
      if (response.data.success) {
        setMessage('Email verified successfully');
        setTimeout(()=>{
            navigate('/login');
        },2000)
        setError('');
      } else {
        setError('Invalid OTP. Please try again.');
        setMessage('');
      }
    } catch (err) {
      setError('Error verifying OTP. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="email-verification-container">
      <h2>Email Verification</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
          required
        />
      </div>
      {otpSent && (
        <div className="form-group">
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
      )}
      {!otpSent ? (
        <button onClick={handleSendOtp} className="send-otp-btn">Send OTP</button>
      ) : (
        <button onClick={handleVerifyOtp} className="verify-otp-btn">Verify OTP</button>
      )}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default VerifyEmail;
