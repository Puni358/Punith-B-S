import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import {
  ShoppingBag,
  Lock,
  Mail,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  Check
} from 'lucide-react';

interface AuthSplitScreenProps {
  initialMode: 'login' | 'signup';
}

export const AuthSplitScreen: React.FC<AuthSplitScreenProps> = ({ initialMode }) => {
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Submission & feedback states
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [appleSubmitting, setAppleSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync state if prop changes via route navigation
  useEffect(() => {
    setMode(initialMode);
    setError(null);
    setSuccessMsg(null);
  }, [initialMode]);

  // Destination after login
  const from = (location.state as any)?.from?.pathname || '/browse';

  const handleModeSwitch = (newMode: 'login' | 'signup') => {
    if (newMode === mode) return;
    setMode(newMode);
    setError(null);
    setSuccessMsg(null);
    navigate(newMode === 'login' ? '/login' : '/signup', { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        setError('Please enter both email and password.');
        return;
      }

      setSubmitting(true);
      try {
        await login(email, password);
        setSuccessMsg('Welcome back! Redirecting to marketplace...');
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 500);
      } catch (err: any) {
        setError(err.message || 'Login failed. Please check your credentials.');
      } finally {
        setSubmitting(false);
      }
    } else {
      // Sign Up validation
      if (!name.trim()) {
        setError('Full Name is required.');
        return;
      }

      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid campus email address.');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      if (!agreeTerms) {
        setError('Please accept the campus marketplace terms to proceed.');
        return;
      }

      setSubmitting(true);
      try {
        await signup(name, email, password);
        setSuccessMsg('Account created successfully! Welcome to Student Market.');
        setTimeout(() => {
          navigate('/browse');
        }, 600);
      } catch (err: any) {
        setError(err.message || 'Failed to create account.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessMsg(null);
    setGoogleSubmitting(true);

    try {
      await loginWithGoogle();
      setSuccessMsg('Signed in with Google! Redirecting...');
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Google authentication failed.');
    } finally {
      setGoogleSubmitting(false);
    }
  };

  const handleAppleSignIn = async () => {
    setError(null);
    setSuccessMsg(null);
    setAppleSubmitting(true);

    try {
      await loginWithGoogle(); // Apple login simulation using auth mock
      setSuccessMsg('Signed in with Apple! Redirecting...');
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Apple authentication failed.');
    } finally {
      setAppleSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-3 sm:px-6">
      {/* Outer Split Screen Container */}
      <div className="bg-[#090A0F] border border-zinc-800/80 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[660px] shadow-2xl shadow-purple-950/20 backdrop-blur-xl">
        {/* LEFT PANEL: Modern Animated Brand / Hero Section */}
        <div className="md:col-span-5 bg-zinc-950 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-zinc-800/60">
          {/* Hero Background Image with Dark Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
              alt="Students studying on campus"
              className="w-full h-full object-cover opacity-25 scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-purple-950/70" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.25),transparent_70%)]" />
          </div>

          {/* Glowing Ambient Spheres & Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e12_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none z-0" />
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl pointer-events-none animate-pulse z-0" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none z-0" />

          {/* Top Brand Tag */}
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-purple-500/30 text-white border border-purple-400/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-purple-400 font-extrabold block">
                  Campus Marketplace
                </span>
                <span className="text-lg font-black tracking-wide text-white">
                  STUDENT MARKET
                </span>
              </div>
            </div>

            {/* Dynamic Animated Headline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 pt-2"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  {mode === 'login' ? 'Welcome Back' : 'Join Campus Market'}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
                  {mode === 'login'
                    ? 'Trade Textbooks & Gear On Campus'
                    : 'Buy & Sell With Fellow Students'}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {mode === 'login'
                    ? 'Sign in to manage your active listings, message verified buyers, and save items.'
                    : 'Create your account to start selling unused textbooks, tech gear, and dorm essentials.'}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Feature Bullet Points */}
            <div className="space-y-3 pt-2 text-xs text-zinc-300">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 font-bold">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Verified .edu campus community</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 font-bold">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>100% free with zero platform fees</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 font-bold">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Direct campus handoffs & cash/Venmo</span>
              </div>
            </div>
          </div>

          {/* Floating Glassmorphic Card with Student Avatar & Image Thumbnail */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 mt-8 p-4 bg-zinc-900/80 border border-purple-500/30 rounded-2xl shadow-xl shadow-purple-950/50 backdrop-blur-md space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-purple-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" /> Student Verified Seller
              </span>
              <span className="text-amber-400 text-xs">★★★★★</span>
            </div>

            <p className="text-xs text-zinc-200 italic leading-snug">
              "Listed my organic chemistry textbook and iPad cover, sold both outside the library in 2 hours!"
            </p>

            <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Priya M."
                  className="w-8 h-8 rounded-full object-cover border border-purple-400/50"
                />
                <div>
                  <div className="text-xs font-semibold text-white">Priya M.</div>
                  <div className="text-[10px] text-zinc-400">CS Senior '26</div>
                </div>
              </div>

              {/* Sample Recently Sold Item Badge */}
              <div className="flex items-center gap-2 bg-purple-950/60 border border-purple-500/30 px-2 py-1 rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=150"
                  alt="Chem Textbook"
                  className="w-6 h-6 rounded object-cover"
                />
                <span className="text-[10px] font-mono text-purple-300 font-bold">$45 SOLD</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT PANEL: Animated Interactive Auth Form */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-zinc-950">
          <div className="max-w-md w-full mx-auto space-y-6">
            {/* Sliding Pill Tab Switcher */}
            <div className="relative p-1.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl flex items-center shadow-inner">
              <button
                type="button"
                onClick={() => handleModeSwitch('login')}
                className={`relative z-10 w-1/2 py-2.5 text-center text-xs font-bold uppercase tracking-wider transition-colors ${
                  mode === 'login' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                id="auth-tab-login"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch('signup')}
                className={`relative z-10 w-1/2 py-2.5 text-center text-xs font-bold uppercase tracking-wider transition-colors ${
                  mode === 'signup' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                id="auth-tab-signup"
              >
                Create Account
              </button>

              {/* Animated Sliding Background Pill */}
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-md shadow-purple-600/30 ${
                  mode === 'login' ? 'left-1.5' : 'left-[calc(50%+3px)]'
                }`}
              />
            </div>

            {/* Error / Success Feedback Alerts */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3.5 bg-red-950/50 border border-red-500/40 rounded-xl flex items-start gap-2.5 text-xs text-red-200"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 font-medium">{error}</div>
                </motion.div>
              )}

              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3.5 bg-emerald-950/50 border border-emerald-500/40 rounded-xl flex items-start gap-2.5 text-xs text-emerald-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 font-medium">{successMsg}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Fields with Motion Animation */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: mode === 'signup' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === 'signup' ? -20 : 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {/* Full Name field (Sign Up Mode) */}
                  {mode === 'signup' && (
                    <div className="space-y-1.5">
                      <label
                        className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                        htmlFor="auth-name-input"
                      >
                        Full Name
                      </label>
                      <div className="relative group">
                        <input
                          id="auth-name-input"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alex Chen"
                          className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-zinc-500 transition-all outline-none"
                        />
                        <User className="w-4 h-4 text-zinc-500 group-focus-within:text-purple-400 absolute left-3.5 top-3.5 pointer-events-none transition-colors" />
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                      htmlFor="auth-email-input"
                    >
                      Campus Email Address
                    </label>
                    <div className="relative group">
                      <input
                        id="auth-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@campus.edu"
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-zinc-500 transition-all outline-none"
                      />
                      <Mail className="w-4 h-4 text-zinc-500 group-focus-within:text-purple-400 absolute left-3.5 top-3.5 pointer-events-none transition-colors" />
                    </div>
                  </div>

                  {/* Password Field with Eye Toggle */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                        htmlFor="auth-password-input"
                      >
                        Password
                      </label>
                      {mode === 'login' && (
                        <Link
                          to="/forgot-password"
                          className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      )}
                    </div>
                    <div className="relative group">
                      <input
                        id="auth-password-input"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={mode === 'signup' ? 'Minimum 6 characters' : '••••••••'}
                        className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 rounded-xl px-4 py-3 pl-10 pr-10 text-sm text-white placeholder-zinc-500 transition-all outline-none"
                      />
                      <Lock className="w-4 h-4 text-zinc-500 group-focus-within:text-purple-400 absolute left-3.5 top-3.5 pointer-events-none transition-colors" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-200 transition-colors p-0.5"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field (Sign Up Mode) */}
                  {mode === 'signup' && (
                    <div className="space-y-1.5">
                      <label
                        className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                        htmlFor="auth-confirm-password-input"
                      >
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <input
                          id="auth-confirm-password-input"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Repeat password"
                          className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 rounded-xl px-4 py-3 pl-10 pr-10 text-sm text-white placeholder-zinc-500 transition-all outline-none"
                        />
                        <Lock className="w-4 h-4 text-zinc-500 group-focus-within:text-purple-400 absolute left-3.5 top-3.5 pointer-events-none transition-colors" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-200 transition-colors p-0.5"
                          title={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Checkbox Options */}
                  {mode === 'login' ? (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="remember-me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="accent-purple-600 w-4 h-4 rounded cursor-pointer"
                      />
                      <label
                        htmlFor="remember-me"
                        className="text-xs text-zinc-400 cursor-pointer selection:bg-none"
                      >
                        Keep me signed in on this device
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="agree-terms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="accent-purple-600 w-4 h-4 rounded mt-0.5 cursor-pointer"
                      />
                      <label
                        htmlFor="agree-terms"
                        className="text-xs text-zinc-400 cursor-pointer selection:bg-none"
                      >
                        I agree to the <span className="text-purple-400 font-semibold underline">Campus Terms</span> & <span className="text-purple-400 font-semibold underline">Community Rules</span>
                      </label>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Primary Submit CTA Button */}
              <button
                type="submit"
                disabled={submitting || googleSubmitting || appleSubmitting}
                id="auth-submit-btn"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold tracking-wider uppercase shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    {mode === 'login' ? 'Logging in...' : 'Creating Account...'}
                  </>
                ) : (
                  <>
                    {mode === 'login' ? 'SIGN IN TO MARKET' : 'CREATE ACCOUNT'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-zinc-800 w-full" />
              <span className="bg-zinc-950 px-3 text-[11px] font-semibold text-zinc-500 uppercase whitespace-nowrap">
                OR CONTINUE WITH
              </span>
              <div className="border-t border-zinc-800 w-full" />
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={submitting || googleSubmitting || appleSubmitting}
                id="auth-google-btn"
                className="py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {googleSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Google</span>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={handleAppleSignIn}
                disabled={submitting || googleSubmitting || appleSubmitting}
                id="auth-apple-btn"
                className="py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {appleSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <svg className="w-4 h-4 flex-shrink-0 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.09c.67-.82 1.13-1.96.99-3.09-1 .04-2.22.67-2.92 1.48-.62.72-1.16 1.88-.99 2.99 1.12.09 2.25-.56 2.92-1.38z" />
                  </svg>
                )}
                <span>Apple</span>
              </button>
            </div>

            {/* Bottom Toggle Prompt */}
            <div className="pt-2 text-center text-xs text-zinc-400">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('signup')}
                    id="switch-to-signup-btn"
                    className="font-semibold text-purple-400 hover:text-purple-300 underline ml-1 transition-colors"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch('login')}
                    id="switch-to-login-btn"
                    className="font-semibold text-purple-400 hover:text-purple-300 underline ml-1 transition-colors"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
