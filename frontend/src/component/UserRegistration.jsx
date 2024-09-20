import React, { useEffect, useState } from 'react';
import './UserRegistration.css'; // Ensure you import the updated CSS file
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const nagivate = useNavigate()

   const BASE_URL = import.meta.env.VITE_API_URL;



  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const data = await response.json();
      // Handle the response data
      console.log(data);
      localStorage.setItem("token",data.token)
      localStorage.setItem("userId",data.user.id)
      localStorage.setItem("email",data.user.email)

      

      nagivate("/admin-dashboard")
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/users/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      const data = await response.json();
      // Handle the response data
      console.log(data);
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <section className="forms-section ">
      {/* <h1 className="section-title ">Animated Forms</h1> */}
      <div className="forms">
        {/* Login Form */}
        <div
          className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}
        >
          <button
            type="button"
            className={`switcher switcher-login `}
            onClick={() => setActiveForm('login')}
          >
            Login
            <span className="underline"></span>
          </button>
          <form className="form form-login" onSubmit={handleLoginSubmit}>
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <button
              type="submit"
              className="btn-login"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Sign Up Form */}
        <div
          className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}
        >
          <button
            type="button"
            className={`switcher switcher-signup`}
            onClick={() => setActiveForm('signup')}
          >
            Sign Up
            <span className="underline"></span>
          </button>
          <form className="form form-signup" onSubmit={handleSignupSubmit}>
            <fieldset>
              <legend>Please, enter your details to sign up.</legend>
              <div className="input-block">
                <label htmlFor="signup-name">Name</label>
                <input
                  id="signup-name"
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <button
              type="submit"
              className="btn-signup"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserRegistration;
