import React from 'react';
import * as Icons from 'lucide-react';

export const FILL = {
  red: 'bg-red',
  blue: 'bg-blue',
  yellow: 'bg-yellow',
  pink: 'bg-pink',
  sky: 'bg-sky',
  lime: 'bg-lime',
  card: 'bg-card',
};

export const TEXT_ON = {
  red: 'text-onaccent',
  blue: 'text-onaccent',
  yellow: 'text-onaccent',
  pink: 'text-onaccent',
  sky: 'text-onaccent',
  lime: 'text-onaccent',
  card: 'text-onaccent',
};

export function Icon({ name, className = 'w-5 h-5', strokeWidth = 2.5 }) {
  const C = Icons[name] || Icons.Circle;
  return <C className={className} strokeWidth={strokeWidth} />;
}

export function Card({ color = 'card', className = '', hover = false, children, ...rest }) {
  return (
    <div
      className={`rounded-xl border-3 border-ink shadow-nb ${FILL[color]} ${TEXT_ON[color]} ${
        hover ? 'nb-hover' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Btn({ color = 'yellow', className = '', icon, children, ...rest }) {
  return (
    <button
      className={`rounded-lg inline-flex items-center justify-center gap-2 border-3 border-ink px-4 py-2.5 font-display text-sm uppercase tracking-wide shadow-nbsm transition-all duration-100 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-nb active:translate-x-[2px] active:translate-y-[2px] active:shadow-nbpress disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-nbsm ${FILL[color]} ${TEXT_ON[color]} ${className}`}
      {...rest}
    >
      {icon && <Icon name={icon} className="w-4 h-4" />}
      {children}
    </button>
  );
}

export function Tag({ color = 'card', className = '', children }) {
  return (
    <span
      className={`rounded-lg inline-flex items-center gap-1 border-3 border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[.12em] ${FILL[color]} ${TEXT_ON[color]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Chip({ active, children, ...rest }) {
  return (
    <button
      className={`rounded-full border-3 border-ink px-5 py-2 font-display text-xs uppercase tracking-widest transition-all duration-100 shadow-nbsm ${
        active
          ? 'bg-red text-onaccent'
          : 'bg-card text-ink hover:bg-yellow'
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function PageHead({ eyebrow, icon, iconColor = 'red', title, sub, badge, right, boxed = false }) {
  const content = (
    <div className="relative animate-pop w-full flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div className="flex-1">
        {eyebrow && (
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-block -rotate-1 rounded-lg border-3 border-ink bg-yellow px-4 py-1.5 font-display text-sm uppercase text-ink shadow-nbsm">
              {eyebrow}
            </span>
            {badge && <Tag color="yellow">{badge}</Tag>}
          </div>
        )}
        <h1 className="flex items-center gap-3 font-display text-3xl uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl heading-shadow">
          {icon && <Icon name={icon} className={`h-9 w-9 shrink-0 text-${iconColor}`} />}
          {title}
        </h1>
        {sub && <p className="mt-4 max-w-3xl text-sm font-bold uppercase tracking-wide text-muted sm:text-base">{sub}</p>}
      </div>
      {right && (
        <div className="shrink-0">
          {right}
        </div>
      )}
    </div>
  );

  if (boxed) {
    return (
      <div className="mb-8 rounded-xl border-3 border-ink bg-card p-6 shadow-nb">
        {content}
      </div>
    );
  }

  return <div className="mb-8">{content}</div>;
}

export function SectionTitle({ children, right, icon = 'Circle' }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-2 font-display text-lg uppercase tracking-tight sm:text-xl">
        <Icon name={icon} className="h-5 w-5 text-red" />
        {children}
      </h2>
      {right && (
        <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
          {right}
        </div>
      )}
    </div>
  );
}

export function Search({ value, onChange, placeholder }) {
  return (
    <div className="flex items-stretch rounded-lg border-3 border-ink bg-card shadow-nb overflow-hidden">
      <div className="flex items-center border-r-3 border-ink bg-yellow px-3">
        <Icon name="Search" className="h-4 w-4" />
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-4 py-3 text-sm font-semibold placeholder:font-medium placeholder:text-muted focus:outline-none"
      />
    </div>
  );
}

export function Progress({ value, color = 'red' }) {
  return (
    <div className="h-4 w-full rounded-lg overflow-hidden border-3 border-ink bg-paper">
      <div
        className={`h-full ${FILL[color]} halftone text-ink/25 transition-[width] duration-500`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Empty({ icon = 'Inbox', title, body, action }) {
  return (
    <Card className="flex flex-col items-center gap-3 p-10 text-center">
      <div className="rounded-lg border-3 border-ink bg-yellow p-3 shadow-nbsm">
        <Icon name={icon} className="h-7 w-7" />
      </div>
      <h3 className="font-display text-lg uppercase">{title}</h3>
      <p className="max-w-md text-sm font-medium text-muted">{body}</p>
      {action}
    </Card>
  );
}

export function Stat({ label, value, delta, color = 'card', icon }) {
  return (
    <Card color={color} hover className="p-5">
      <div className="mb-3 flex items-start justify-between">
        <div className="rounded-lg border-3 border-ink bg-card p-2 text-ink shadow-nbsm">
          <Icon name={icon} className="h-4 w-4" />
        </div>
        {delta && (
          <span className="rounded-lg border-3 border-ink bg-card px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink">
            {delta}
          </span>
        )}
      </div>
      <div className="font-display text-3xl leading-none">{value}</div>
      <div className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[.14em] opacity-80">
        {label}
      </div>
    </Card>
  );
}
