import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { courses, velocityData, preLearningTopics, user } from '../data/mock';
import { Card, Btn, Tag, Search, Icon, PageHead, SectionTitle, Progress, FILL } from '../components/ui';

function CourseCard({ c }) {
  return (
    <Card hover className="flex flex-col overflow-hidden">
      <div className={`${FILL[c.color]} halftone relative border-b-3 border-ink px-4 py-6 text-ink/20`}>
        <div className="relative flex items-start justify-between">
          <Tag color="card">{c.category}</Tag>
          <Tag color="card">{c.level}</Tag>
        </div>
      </div>
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
            <Icon name="Layers" className="h-3 w-3" /> {c.missions} missions
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Clock" className="h-3 w-3" /> {c.hours} hr
          </span>
        </div>
        <Link to="/courses" className="mt-4">
          <Btn color={c.color} className="w-full">
            Start mission
          </Btn>
        </Link>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState(['Linear Algebra']);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const toggle = (t) =>
    setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <div className="space-y-10">
      <PageHead
        eyebrow="Origin Point"
        title={
          <>
            Multiverse
            <br />
            Learning
          </>
        }
        sub="Every learner runs a different timeline. Pick a thread and start your course."
        right={
          <Link to="/courses">
            <Btn color="red" icon="Rocket">
              Start your course
            </Btn>
          </Link>
        }
      />

      {/* Velocity + side stats */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle
            right={<Tag color="lime">Live</Tag>}
          >
            Learning Velocity
          </SectionTitle>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={velocityData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <CartesianGrid stroke="#10101418" strokeDasharray="4 4" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700 }} stroke="#101014" strokeWidth={2} />
                <YAxis tick={{ fontSize: 11, fontWeight: 700 }} stroke="#101014" strokeWidth={2} />
                <Tooltip
                  contentStyle={{ border: '3px solid #101014', boxShadow: '4px 4px 0 #101014', borderRadius: 0, fontWeight: 700 }}
                />
                <Line
                  type="monotone"
                  dataKey="velocity"
                  stroke="#FF3B30"
                  strokeWidth={4}
                  dot={{ r: 5, fill: '#FFD426', stroke: '#101014', strokeWidth: 3 }}
                  activeDot={{ r: 7, fill: '#2D5BFF', stroke: '#101014', strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <Card color="blue" className="p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[.16em]">Mastery</span>
              <Icon name="Brain" className="h-5 w-5" />
            </div>
            <div className="mt-2 font-display text-4xl leading-none">88%</div>
            <div className="mt-3 border-3 border-ink bg-white">
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
                    : 'bg-card shadow-nbsm hover:bg-white'
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
