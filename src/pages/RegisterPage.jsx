import React, { useState } from 'react';
import { registerUser } from '../api/auth';

export function RegisterPage({ onNavigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!name.trim() || !email.trim()) {
      setError('Please provide both your name and email');
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({ name: name.trim(), email: email.trim() });
      setMessage(res.message || 'Registration successful! Proceed to log in.');
      setTimeout(() => {
        onNavigate('login');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">UVCE</div>
          <h2 className="auth-title">Create an Account</h2>
          <p className="auth-subtitle">Join the UVCE Student Portal & Marketplace</p>
        </div>

        {error && <div className="alert-error">{error}</div>}
        {message && <div className="alert-success">{message}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">UVCE Student Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="student@uvce.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
          Already registered?{' '}
          <button
            onClick={() => onNavigate('login')}
            style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            Log in here
          </button>
        </div>
      </div>
    </div>
  );
}
