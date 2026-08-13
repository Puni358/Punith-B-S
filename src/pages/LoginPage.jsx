import React, { useState } from 'react';
import { requestOtp, verifyOtp } from '../api/auth';
import { useAuth } from '../components/AuthContext';

export function LoginPage({ onNavigate }) {
  const { loginWithToken } = useAuth();
  const [step, setStep] = useState('request'); // 'request' | 'verify'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const res = await requestOtp({ email: email.trim() });
      setMessage(res.message || 'Verification passcode sent to your email.');
      setStep('verify');
    } catch (err) {
      setError(err.message || 'Failed to send OTP code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!code.trim()) {
      setError('Please enter the 6-digit passcode');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp({ email: email.trim(), code: code.trim() });
      loginWithToken(res.access_token);
      onNavigate('marketplace');
    } catch (err) {
      setError(err.message || 'Invalid verification passcode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">UVCE</div>
          <h2 className="auth-title">Welcome to Sync-UVCE</h2>
          <p className="auth-subtitle">Student Portal & Marketplace Access</p>
        </div>

        {error && <div className="alert-error">{error}</div>}
        {message && <div className="alert-success">{message}</div>}

        {step === 'request' ? (
          <form onSubmit={handleRequestOtp}>
            <div className="form-group">
              <label className="form-label">UVCE Email Address</label>
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
              {loading ? 'Sending Code...' : 'Send Passcode'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label className="form-label">Enter 6-Digit Passcode</label>
              <input
                type="text"
                className="form-input"
                placeholder="123456"
                value={code}
                maxLength={6}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Log In'}
            </button>
            <button
              type="button"
              className="nav-item"
              style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
              onClick={() => {
                setStep('request');
                setError('');
                setMessage('');
              }}
            >
              Back to Email
            </button>
          </form>
        )}

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('register')}
            style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}
