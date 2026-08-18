import React from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { telemetryStats, learningTimeData, accuracyTrend } from '../data/mock';
import { Card, Stat, Tag, Icon, PageHead, SectionTitle } from '../components/ui';

const tooltipStyle = {
  border: '3px solid #101014',
  boxShadow: '4px 4px 0 #101014',
  borderRadius: 0,
  fontWeight: 700,
  fontFamily: 'Inter, sans-serif',
};

export default function Analytics() {
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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={learningTimeData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid stroke="#10101418" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700 }} stroke="#101014" strokeWidth={2} />
                <YAxis tick={{ fontSize: 11, fontWeight: 700 }} stroke="#101014" strokeWidth={2} />
                <Tooltip cursor={{ fill: '#10101410' }} contentStyle={tooltipStyle} />
                <Bar dataKey="hours" stroke="#101014" strokeWidth={3} radius={0}>
                  {learningTimeData.map((d, i) => (
                    <Cell key={i} fill={d.hours >= 4 ? '#FFD426' : '#FF3B30'} />
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
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyTrend} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid stroke="#10101418" strokeDasharray="4 4" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fontWeight: 700 }} stroke="#101014" strokeWidth={2} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 11, fontWeight: 700 }} stroke="#101014" strokeWidth={2} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#2D5BFF"
                  strokeWidth={4}
                  dot={{ r: 5, fill: '#FFD426', stroke: '#101014', strokeWidth: 3 }}
                  activeDot={{ r: 7, fill: '#FF3B30', stroke: '#101014', strokeWidth: 3 }}
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
