import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    const subject = "Reset Password OTP"; 

    try {
      const response = await axios.post('/api/auth/sendOTP', { email, subject });
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
      setError('Error sending OTP. Make Sure you have Registered this mail');
      setMessage('');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('/api/auth/verifyOTP', { email, otp });
      if (response.data.success) {
        setResetPassword(true);
        setOtpSent(false); // Hide the timer
        setMessage('OTP verified successfully. You can now reset your password.');
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

  const handleChangePassword = async () => {
    try {
      const response = await axios.post('/api/auth/resetPassword', { email, newPassword });
      if (response.data) {
        setMessage('Password reset successfully');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        setError('');
      } else {
        setError('Failed to reset password. Please try again.');
        setMessage('');
      }
    } catch (err) {
      setError('Error resetting password. Please try again.');
      setMessage('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (resetPassword && newPassword === confirmPassword) {
      handleChangePassword();
    } else {
      setError('Passwords do not match');
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="login m-4 flex-grow flex justify-center items-center space-x-2 my-16 ">
      <div className="loginBox flex flex-col bg-gray-200 p-5 md:p-10 space-y-5 rounded-lg justify-center w-full max-w-md">
        <h1 className="text-center font-medium text-xl md:text-2xl py-4">Forgot Password</h1>
        <div className="inputs flex flex-col space-y-2 ">
          {/* <label className="block text-gray-700 dark:text-gray-300 mb-2">Email:</label> */}
          <input
            type="email"
            className="username rounded-lg px-3 p-2 md:px-4 md:p-3 "
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="btn  p-2 rounded-full bg-green-500  hover:bg-green-600"
          >
            Send OTP
          </button>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">OTP:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              {otpSent && <p className="text-gray-500 text-sm mt-2">Time remaining: {formatTime(timer)}</p>}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Verify OTP
            </button>
          </>
        )}
        {resetPassword && (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">New Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirm Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
          </form>
        )}
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
