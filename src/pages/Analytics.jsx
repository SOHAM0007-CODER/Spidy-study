import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { telemetryStats, learningTimeData, accuracyTrend } from '../data/mock';
import { Card, Stat, Tag, Icon, PageHead, SectionTitle } from '../components/ui';
import { useTheme } from '../lib/theme';

const readVar = (n, alpha) =>
  `rgb(${getComputedStyle(document.documentElement).getPropertyValue(n).trim()}${alpha ? ` / ${alpha}` : ''})`;

export default function Analytics() {
  const { theme } = useTheme();
  const [c, setC] = useState(null);

  useEffect(() => {
    // Wait for the next frame to ensure CSS variables are applied
    const timer = setTimeout(() => {
      setC({
        border: readVar('--c-border'),
        border18: readVar('--c-border', '0.18'),
        border10: readVar('--c-border', '0.10'),
        red: readVar('--c-red'),
        blue: readVar('--c-blue'),
        yellow: readVar('--c-yellow'),
        card: readVar('--c-card'),
        ink: readVar('--c-border'),
      });
    }, 10);
    return () => clearTimeout(timer);
  }, [theme]);

  if (!c) return <div className="space-y-8 min-h-screen" />;

  const tooltipStyle = {
    border: `3px solid ${c.border}`,
    boxShadow: `4px 4px 0 ${c.border}`,
    borderRadius: 0,
    fontWeight: 700,
    fontFamily: 'Inter, sans-serif',
    backgroundColor: c.card,
    color: c.ink,
  };

  return (
    <div className="space-y-8">
      <PageHead
        eyebrow="Telemetry Specs"
        badge="Cognitive"
        title="Multiverse Cognitive Telemetry"
        sub="Detailed insight into your adaptive learning — where the time went and whether it stuck."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {telemetryStats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <SectionTitle right={<Tag color="red">This week</Tag>}>Learning Time</SectionTitle>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" key={`bar-${theme}`}>
              <BarChart data={learningTimeData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid stroke={c.border18} strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700, fill: c.border }} stroke={c.border} strokeWidth={2} />
                <YAxis tick={{ fontSize: 11, fontWeight: 700, fill: c.border }} stroke={c.border} strokeWidth={2} />
                <Tooltip cursor={{ fill: c.border10 }} contentStyle={tooltipStyle} />
                <Bar dataKey="hours" stroke={c.border} strokeWidth={3} radius={0}>
                  {learningTimeData.map((d, i) => (
                    <Cell key={i} fill={d.hours >= 4 ? c.yellow : c.red} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
            Yellow bars mark days you beat the 4 hr target
          </p>
        </Card>

        <Card className="p-5">
          <SectionTitle right={<Tag color="blue">6 weeks</Tag>}>Accuracy Trend</SectionTitle>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" key={`line-${theme}`}>
              <LineChart data={accuracyTrend} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid stroke={c.border18} strokeDasharray="4 4" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fontWeight: 700, fill: c.border }} stroke={c.border} strokeWidth={2} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11, fontWeight: 700, fill: c.border }} stroke={c.border} strokeWidth={2} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke={c.blue}
                  strokeWidth={4}
                  dot={{ r: 5, fill: c.yellow, stroke: c.border, strokeWidth: 3 }}
                  activeDot={{ r: 7, fill: c.red, stroke: c.border, strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
            +34 points since you switched to daily revision runs
          </p>
        </Card>
      </div>

      <Card color="yellow" className="flex flex-wrap items-center gap-4 p-5">
        <span className="border-3 border-ink bg-card p-2.5">
          <Icon name="Lightbulb" className="h-5 w-5" />
        </span>
        <p className="flex-1 text-sm font-bold">
          Your accuracy climbs hardest on days you revise before starting new material. Front-load the
          revision queue and you should clear 90% next week.
        </p>
      </Card>
    </div>
  );
}
