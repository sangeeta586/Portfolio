import React, { useState } from 'react';
import './UserRegistration.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserRegistration = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const navigate = useNavigate();
  
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

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('email', data.user.email);

        // SweetAlert2 success alert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in!',
        });

        navigate('/admin-dashboard');
      } else {
        // SweetAlert2 error alert
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.message || 'Invalid login credentials!',
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during login. Please try again later.',
      });
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

      if (response.ok) {
        // SweetAlert2 success alert
        Swal.fire({
          icon: 'success',
          title: 'Sign Up Successful',
          text: 'You have successfully signed up!',
        });
        setActiveForm('login'); // Switch to login form after sign-up
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Sign Up Failed',
          text: data.message || 'There was a problem with the registration.',
        });
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during sign-up. Please try again later.',
      });
    }
  };

  return (
    <div className="flex justify-center content-center items-center mt-40">
      <section className="flex justify-center content-center items-center">
        <div className="forms">
          <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
            <button
              type="button"
              className="switcher switcher-login"
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
              <button type="submit" className="btn-login">Log In</button>
            </form>
          </div>

          <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
            <button
              type="button"
              className="switcher switcher-signup"
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
              <button type="submit" className="btn-signup">Sign Up</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserRegistration;
