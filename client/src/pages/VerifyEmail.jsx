import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0); // Timer state
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      // Reset OTP state when timer runs out
      setOtpSent(false);
      setOtp('');
      setMessage('');
      setError('OTP expired. Please request a new OTP.');
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = async () => {
    const subject = "Email Verification OTP"; 
    try {
      const response = await axios.post('/api/auth/sendOTP', { email,subject });
      if (response.data.success) {
        setOtpSent(true);
        setTimer(300); // Setting timer to 5 minutes
        setMessage('OTP sent to your email address');
        setError('');
      } else {
        setError('Failed to send OTP. Please try again.');
        setMessage('');
      }
    } catch (err) {
      setError('Error sending OTP. Make sure you have registered this mail.');
      setMessage('');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('/api/auth/verifyOTP', { email, otp });
      if (response.data.success) {
        setMessage('Email verified successfully');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        setError('');
      } else {
        setError('Invalid OTP or OTP expired. Please try again.');
        setMessage('');
      }
    } catch (err) {
      setError('Error verifying OTP. Please try again.');
      setMessage('');
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Email Verification</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
            required
          />
        </div>
        {otpSent && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">OTP:</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <p className="text-gray-500 text-sm mt-2">Time remaining: {formatTime(timer)}</p>
          </div>
        )}
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send OTP
          </button>
        ) : (
          <button
            onClick={handleVerifyOtp}
            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Verify OTP
          </button>
        )}
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;
