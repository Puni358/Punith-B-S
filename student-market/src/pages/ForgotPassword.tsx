import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowLeft, AlertCircle, CheckCircle2, Loader2, KeyRound } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      await resetPassword(email);
      setSuccessMsg(`Password reset link sent to ${email}. Please check your inbox.`);
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8 px-4">
      <div className="retro-card max-w-md w-full p-6 sm:p-8 bg-[#F7F3EF] space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1A1A1A] text-[#F7F3EF] border-2 border-[#1A1A1A] shadow-[3px_3px_0_#C9B59C] mb-2">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="font-mono text-2xl font-extrabold text-[#1A1A1A] uppercase tracking-wide">
            Reset Password
          </h1>
          <p className="font-sans text-xs text-[#666666]">
            Enter your campus email address and we'll send you a password recovery link.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#FFEDED] border-2 border-[#1A1A1A] flex items-start gap-2.5 text-xs font-mono text-[#990000] shadow-[2px_2px_0_#1A1A1A]">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1 font-sans font-semibold">{error}</div>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-[#EFFFF2] border-2 border-[#1A1A1A] flex items-start gap-2.5 text-xs font-mono text-[#006622] shadow-[2px_2px_0_#1A1A1A]">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1 font-sans font-semibold">{successMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div className="space-y-1.5">
            <label className="block font-mono text-xs font-bold uppercase text-[#1A1A1A]" htmlFor="reset-email">
              Campus Email Address
            </label>
            <div className="relative">
              <input
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@campus.edu"
                className="retro-input w-full px-3.5 py-2.5 text-sm pl-10"
              />
              <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            id="reset-submit-btn"
            className="retro-btn retro-btn-primary w-full py-3 text-sm uppercase font-bold flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending Link...
              </>
            ) : (
              'SEND RESET LINK'
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link
            to="/login"
            id="reset-back-to-login-link"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1A1A1A] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
