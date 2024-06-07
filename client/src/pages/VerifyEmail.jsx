import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    const subject = "Email Verification OTP";
    try {
      const response = await axios.post('/api/auth/sendOTP', { email, subject });
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
        setTimeout(() => {
          navigate('/login');
        }, 2000);
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

    <div className="login m-4 flex-grow flex justify-center items-center space-x-2 my-16 ">
      <div className="loginBox flex flex-col bg-gray-200 p-5 md:p-10 space-y-5 rounded-lg justify-center w-full max-w-md">
        <h1 className="text-center font-medium text-xl md:text-2xl py-4">Email Verification</h1>
        <div className="inputs flex flex-col space-y-2 ">

          <input
            type="email"
            className="username rounded-lg px-3 p-2 md:px-4 md:p-3 "
            placeholder="Enter Your Email"
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
              className="w-full px-3 p-2 md:px-4 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"

              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="btn  p-2 rounded-full bg-green-500  hover:bg-green-600"
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
