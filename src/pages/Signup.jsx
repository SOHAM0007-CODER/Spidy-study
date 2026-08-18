import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { Card, Tag, Icon } from '../components/ui';
import { signIn } from '../lib/auth';

export default function Signup() {
  const navigate = useNavigate();
  const [codename, setCodename] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      // Use codename or email prefix
      const name = codename.trim() || email.split('@')[0] || 'Hero';
      signIn(name);
      navigate('/');
    }, 600);
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md p-6 sm:p-8 rounded-2xl border-3 border-ink bg-card shadow-nb text-ink">
        
        <div className="flex justify-center mb-6">
          <Tag color="yellow" className="uppercase font-display tracking-wide border-3 shadow-nbsm">
            Recruitment Portal
          </Tag>
        </div>

        <h1 className="heading-shadow font-display text-3xl uppercase leading-none text-white text-center mb-2">
          Join the League
        </h1>
        
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted text-center mb-8">
          Enter your credentials to access your HQ
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-2">
            <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
              Hero Codename
            </label>
            <input
              type="text"
              value={codename}
              onChange={(e) => setCodename(e.target.value)}
              placeholder="e.g. Miles"
              className="w-full rounded-lg border-3 border-ink bg-paper px-4 py-2.5 font-semibold text-ink placeholder:font-medium placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan shadow-nbsm transition-shadow"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
              Multiverse Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hero@earth1610.com"
              className="w-full rounded-lg border-3 border-ink bg-paper px-4 py-2.5 font-semibold text-ink placeholder:font-medium placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan shadow-nbsm transition-shadow"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
                Access Code
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border-3 border-ink bg-paper px-4 py-2.5 font-semibold text-ink placeholder:font-medium placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan shadow-nbsm transition-shadow"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
                Confirm Code
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border-3 border-ink bg-paper px-4 py-2.5 font-semibold text-ink placeholder:font-medium placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan shadow-nbsm transition-shadow"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full flex items-center justify-center gap-2 rounded-xl border-3 border-ink bg-red px-6 py-4 mt-2 font-display uppercase text-white shadow-nb transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-nblg active:translate-x-[2px] active:translate-y-[2px] active:shadow-nbsm disabled:opacity-70 disabled:pointer-events-none"
          >
            {busy ? (
              <>
                <Icon name="Loader2" className="h-5 w-5 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <Icon name="Zap" className="h-5 w-5" />
                Create Hero Profile
              </>
            )}
          </button>

        </form>
        
        <div className="mt-8 text-center font-bold text-sm">
          <span className="text-muted mr-2 uppercase tracking-wide">Already a Hero?</span>
          <Link to="/login" className="text-cyan uppercase tracking-wide hover:underline">
            Sign In
          </Link>
        </div>
      </Card>
    </AuthLayout>
  );
}
