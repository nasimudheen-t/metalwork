import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const res = await axios.post(endpoint, { email, password });

      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        alert('Login successful!');
        navigate('/dashbord');
      } else {
        alert('Registration successful! Now you can log in.');
        setIsLogin(true);
      }
    } catch (err) {
      alert((err.response && err.response.data && err.response.data.message) || 'Something went wrong');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-1">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            className="btn btn-link p-0"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </div>
      </div>
    </div>
  );
}
