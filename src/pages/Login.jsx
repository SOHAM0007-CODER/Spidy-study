import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Card, Tag, Btn, Icon } from '../components/ui';
import { signIn, signInWithGoogle } from '../lib/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const handleGoogleLogin = async () => {
    setBusy(true);
    setError(null);
    try {
      await signInWithGoogle();
      // Supabase OAuth redirects to Google and back, so navigate('/') here isn't strictly needed
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md p-6 sm:p-8 rounded-2xl border-3 border-ink bg-card shadow-nb text-ink">
        
        <div className="flex justify-center mb-6">
          <Tag color="yellow" className="uppercase font-display tracking-wide border-3 shadow-nbsm">
            Authentication Portal
          </Tag>
        </div>

        <h1 className="heading-shadow font-display text-3xl uppercase leading-none text-white text-center mb-2">
          Multiverse Portal
        </h1>
        
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted text-center mb-8">
          Enter your credentials to access your HQ
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red/10 border-2 border-red text-red text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Field 1 */}
          <div className="space-y-2">
            <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
              Multiverse Email or Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username or hero@earth1610.com"
              className="w-full rounded-lg border-3 border-ink bg-paper px-4 py-3 font-semibold text-ink placeholder:font-medium placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan shadow-nbsm transition-shadow"
            />
          </div>

          {/* Field 2 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
                Access Code
              </label>
              <button type="button" className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan hover:underline">
                Forgot code?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border-3 border-ink bg-paper px-4 py-3 font-semibold text-ink placeholder:font-medium placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan shadow-nbsm transition-shadow"
            />
          </div>

          {/* Main submit */}
          <button
            type="submit"
            disabled={busy}
            className="w-full flex items-center justify-center gap-2 rounded-xl border-3 border-ink bg-red px-6 py-4 font-display uppercase text-white shadow-nb transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-nblg active:translate-x-[2px] active:translate-y-[2px] active:shadow-nbsm disabled:opacity-70 disabled:pointer-events-none"
          >
            {busy ? (
              <>
                <Icon name="Loader2" className="h-5 w-5 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <Icon name="Zap" className="h-5 w-5" />
                Sign in to HQ
              </>
            )}
          </button>
          
          <div className="flex items-center gap-4 my-6">
            <div className="h-[2px] flex-1 bg-ink/20" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
              Or connect via
            </span>
            <div className="h-[2px] flex-1 bg-ink/20" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={busy}
              className="flex items-center justify-center gap-2 rounded-lg border-3 border-ink bg-card py-3 font-display text-sm uppercase text-ink shadow-nbsm transition-all hover:bg-paper active:shadow-nbpress disabled:opacity-70"
            >
              <Icon name="Chrome" className="h-4 w-4" /> Google
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={busy}
              className="flex items-center justify-center gap-2 rounded-lg border-3 border-ink bg-card py-3 font-display text-sm uppercase text-ink shadow-nbsm transition-all hover:bg-paper active:shadow-nbpress disabled:opacity-70"
            >
              <Icon name="Github" className="h-4 w-4" /> Github
            </button>
          </div>

        </form>
        
        <div className="mt-8 text-center font-bold text-sm">
          <span className="text-muted mr-2 uppercase tracking-wide">New Hero?</span>
          <Link to="/signup" className="text-cyan uppercase tracking-wide hover:underline">
            Join the League
          </Link>
        </div>
      </Card>
    </AuthLayout>
  );
}
