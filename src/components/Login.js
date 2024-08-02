import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import '../css/Login.css'; // Import the CSS file
import Signup from './Signup'; // Import the Signup component
import RecoveryPassword from './RecoveryPassword'; // Import the RecoveryPassword component

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false); // Add state for RecoveryPassword
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(data.token);
        navigate('/');
      } else {
        // Replace alert with toast error message
        toast.error(`Login failed: ${data.message || 'Unknown error'}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle fetch error with toast
      toast.error('An error occurred during login. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer /> {/* Add ToastContainer for toasts */}
      {showSignup ? (
        <Signup onClose={() => setShowSignup(false)} />
      ) : showRecovery ? (
        <RecoveryPassword onClose={() => setShowRecovery(false)} />
      ) : (
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setShowSignup(true)}>
              Create New User
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setShowRecovery(true)}>
              Forgot Password?
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
