import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { courses, velocityData, preLearningTopics, user } from '../data/mock';
import { Card, Btn, Tag, Search, Icon, PageHead, SectionTitle, Progress, FILL } from '../components/ui';
import { useTheme } from '../lib/theme';
import { Thumb } from '../components/Thumb';

const readVar = (n, alpha) =>
  `rgb(${getComputedStyle(document.documentElement).getPropertyValue(n).trim()}${alpha ? ` / ${alpha}` : ''})`;

function CourseCard({ c }) {
  const navigate = useNavigate();
  return (
    <Card hover className="flex flex-col overflow-hidden">
      <Thumb course={c} />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base uppercase leading-tight">{c.title}</h3>
        <p className="mt-2 flex-1 text-sm font-medium text-muted">{c.blurb}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <span key={t} className="border-2 border-ink px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
          <span className="flex items-center gap-1">
            <Icon name="Layers" className="h-3 w-3" /> {c.missions?.length || c.missions} missions
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Clock" className="h-3 w-3" /> {c.hours} hr
          </span>
        </div>
        <div className="mt-4">
          <Btn color={c.color} className="w-full" onClick={() => navigate(`/mission/${c.id}`)}>
            Start mission
          </Btn>
        </div>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState(['Linear Algebra']);
  const { theme } = useTheme();
  const [c, setC] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setC({
        border: readVar('--c-border'),
        border18: readVar('--c-border', '0.18'),
        red: readVar('--c-red'),
        blue: readVar('--c-blue'),
        yellow: readVar('--c-yellow'),
        card: readVar('--c-card'),
        ink: readVar('--c-border'),
      });
    }, 10);
    return () => clearTimeout(timer);
  }, [theme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (co) =>
        co.title.toLowerCase().includes(q) ||
        co.category.toLowerCase().includes(q) ||
        co.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const toggle = (t) =>
    setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <div className="space-y-10">
      <Card className="relative overflow-hidden p-8 sm:p-10 animate-pop">
        <div className="absolute inset-y-0 left-0 w-4 border-r-3 border-ink bg-red halftone" />
        <div className="relative z-10 pl-2 sm:pl-4">
          <div className="eyebrow mb-2 text-muted">Origin Point</div>
          <h1 className="font-display text-4xl uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
            Multiverse<br />Learning
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium text-muted sm:text-lg">
            Every learner runs a different timeline. Pick a thread and start your course.
          </p>
          <div className="mt-8">
            <Link to="/courses">
              <Btn color="red" icon="Rocket">
                Start your course
              </Btn>
            </Link>
          </div>
        </div>
      </Card>

      {/* Velocity + side stats */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle
            right={<Tag color="lime">Live</Tag>}
          >
            Learning Velocity
          </SectionTitle>
          <div className="h-56">
            {c && (
              <ResponsiveContainer width="100%" height="100%" key={`line-${theme}`}>
                <LineChart data={velocityData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                  <CartesianGrid stroke={c.border18} strokeDasharray="4 4" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700, fill: c.border }} stroke={c.border} strokeWidth={2} />
                  <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: c.border }} stroke={c.border} strokeWidth={2} />
                  <Tooltip
                    contentStyle={{ border: `3px solid ${c.border}`, boxShadow: `4px 4px 0 ${c.border}`, borderRadius: 0, fontWeight: 700, backgroundColor: c.card, color: c.ink }}
                  />
                  <Line
                    type="monotone"
                    dataKey="velocity"
                    stroke={c.red}
                    strokeWidth={4}
                    dot={{ r: 5, fill: c.yellow, stroke: c.border, strokeWidth: 3 }}
                    activeDot={{ r: 7, fill: c.blue, stroke: c.border, strokeWidth: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <Card color="blue" className="p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[.16em]">Mastery</span>
              <Icon name="Brain" className="h-5 w-5" />
            </div>
            <div className="mt-2 font-display text-4xl leading-none">88%</div>
            <div className="mt-3 border-3 border-ink bg-card">
              <div className="h-3 bg-yellow" style={{ width: '88%' }} />
            </div>
          </Card>
          <Card color="yellow" className="p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[.16em]">Time Budget</span>
              <Icon name="Hourglass" className="h-5 w-5" />
            </div>
            <div className="mt-2 font-display text-4xl leading-none">2.7 hr</div>
            <p className="mt-1.5 text-xs font-bold text-ink/70">of 4 hr daily target</p>
          </Card>
        </div>
      </div>

      {/* Search */}
      <div>
        <Search
          value={query}
          onChange={setQuery}
          placeholder="Search multiverse courses, topics, concepts…"
        />
      </div>

      {/* Recommendations */}
      <div>
        <SectionTitle right={<Link to="/courses" className="eyebrow underline">View all</Link>}>
          Multiverse Recommendations
        </SectionTitle>
        {results.length === 0 ? (
          <Card className="p-8 text-center font-semibold text-muted">
            No timeline matches “{query}”. Try a broader term.
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((c) => (
              <CourseCard key={c.id} c={c} />
            ))}
          </div>
        )}
      </div>

      {/* Pre-learning assignment */}
      <Card color="yellow" className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="eyebrow">Calibration</span>
            <h2 className="mt-1 font-display text-2xl uppercase leading-none">Pre-Learning Assignment</h2>
          </div>
          <Tag color="card">Step 1 of 3</Tag>
        </div>
        <p className="mt-3 max-w-2xl text-sm font-bold text-ink/80">
          Which concepts are you already familiar with? We skip what you know and route you straight
          to the gaps.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {preLearningTopics.map((t) => {
            const on = picked.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggle(t)}
                className={`flex items-center gap-2 border-3 border-ink px-3 py-2 text-sm font-bold transition-all duration-100 ${
                  on
                    ? 'translate-x-[2px] translate-y-[2px] bg-ink text-paper shadow-nbpress'
                    : 'bg-card shadow-nbsm hover:bg-card'
                }`}
              >
                <span className={`grid h-4 w-4 place-items-center border-2 border-current`}>
                  {on && <Icon name="Check" className="h-3 w-3" />}
                </span>
                {t}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t-3 border-ink pt-5">
          <Btn color="red" icon="ArrowRight">
            Select the topic
          </Btn>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
            {picked.length} selected · suggested track: Neural Networks & Deep Learning
          </span>
        </div>
      </Card>
    </div>
  );
}
