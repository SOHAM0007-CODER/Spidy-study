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
      className={`border-3 border-ink shadow-nb ${FILL[color]} ${TEXT_ON[color]} ${
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
      className={`inline-flex items-center justify-center gap-2 border-3 border-ink px-4 py-2.5 font-display text-sm uppercase tracking-wide shadow-nbsm transition-all duration-100 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-nb active:translate-x-[2px] active:translate-y-[2px] active:shadow-nbpress disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-nbsm ${FILL[color]} ${TEXT_ON[color]} ${className}`}
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
      className={`inline-flex items-center gap-1 border-3 border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[.12em] ${FILL[color]} ${TEXT_ON[color]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Chip({ active, children, ...rest }) {
  return (
    <button
      className={`border-3 border-ink px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-100 ${
        active
          ? 'bg-ink text-paper shadow-nbpress translate-x-[2px] translate-y-[2px]'
          : 'bg-card text-ink shadow-nbsm hover:bg-yellow'
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function PageHead({ eyebrow, title, sub, badge, right }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="animate-pop">
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2">
            <span className="eyebrow text-muted">{eyebrow}</span>
            {badge && <Tag color="yellow">{badge}</Tag>}
          </div>
        )}
        <h1 className="font-display text-3xl uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {sub && <p className="mt-3 max-w-2xl text-sm font-medium text-muted sm:text-base">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function SectionTitle({ children, right }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-3 font-display text-lg uppercase tracking-tight sm:text-xl">
        <span className="h-5 w-2 bg-ink" />
        {children}
      </h2>
      {right}
    </div>
  );
}

export function Search({ value, onChange, placeholder }) {
  return (
    <div className="flex items-stretch border-3 border-ink bg-card shadow-nb">
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
    <div className="h-4 w-full border-3 border-ink bg-paper">
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
      <div className="border-3 border-ink bg-yellow p-3 shadow-nbsm">
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
        <div className="border-3 border-ink bg-card p-2 text-ink shadow-nbsm">
          <Icon name={icon} className="h-4 w-4" />
        </div>
        {delta && (
          <span className="border-3 border-ink bg-card px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink">
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
