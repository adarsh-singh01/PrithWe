import React from 'react'
import LoginForm from '../components/LoginForm'

function Login({ setLoggedIn }) {
  return (
    <div className="flex-grow mt-20">
      <LoginForm setLoggedIn={setLoggedIn} />
    </div>
  );
}

export default Login