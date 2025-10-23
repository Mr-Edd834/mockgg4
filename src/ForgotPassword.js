import React, { useState } from 'react';
import './ForgotPassword.css';
import { useAuth } from './Contexts/AuthContext';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      setLoading(true);
      await forgotPassword(email);
      console.log('✅ Password reset email sent');
      setMessage('Check your inbox for a reset link.');
    } catch (error) {
      console.error('❌ Error sending password reset email:', error);
      setError('Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fp-page" style={{ padding: '20px' }}>
      <h2>Forgot Password?</h2>
      <p>Enter your email below to receive a reset link.</p>
      
      <form className="fp-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="fp-button" disabled={loading} type="submit">
          {loading ? 'Sending...' : 'Reset Password'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
