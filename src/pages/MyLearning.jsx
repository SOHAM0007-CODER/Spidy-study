import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/mock';
import { Card, Btn, Tag, Chip, Icon, PageHead, SectionTitle, Progress, Empty, FILL } from '../components/ui';

const TABS = ['Enrolled', 'Completed'];

export default function MyLearning() {
  const [tab, setTab] = useState('Enrolled');
  const enrolled = courses.filter((c) => c.enrolled && c.progress < 100);
  const completed = courses.filter((c) => c.progress >= 100);
  const list = tab === 'Enrolled' ? enrolled : completed;

  return (
    <div className="space-y-8">
      <PageHead
        eyebrow="Your Multiverse History"
        title="My Learning"
        sub="Every mission you have entered, and what it cost you in time and accuracy."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['Learning Time', '18.4 hr', 'Clock', 'blue'],
          ['Learning Pace', '1.3×', 'Gauge', 'pink'],
          ['Accuracy', '88%', 'Target', 'yellow'],
        ].map(([label, value, icon, color]) => (
          <Card key={label} color={color} className="flex items-center gap-3 p-4">
            <span className="border-3 border-ink bg-card p-2 text-ink">
              <Icon name={icon} className="h-4 w-4" />
            </span>
            <div>
              <div className="font-display text-xl leading-none">{value}</div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-80">
                {label}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Missions */}
        <div>
          <SectionTitle
            right={
              <div className="flex gap-2">
                {TABS.map((t) => (
                  <Chip key={t} active={tab === t} onClick={() => setTab(t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            }
          >
            Enrolled & Completed
          </SectionTitle>

          {list.length === 0 ? (
            <Empty
              icon="BookMarked"
              title="Nothing here yet"
              body="You haven't enrolled in a mission on this tab. Pick a timeline and the tracker starts filling itself."
              action={
                <Link to="/courses">
                  <Btn color="red" icon="Compass">
                    Explore multiverse courses
                  </Btn>
                </Link>
              }
            />
          ) : (
            <div className="space-y-4">
              {list.map((c) => (
                <Card key={c.id} hover className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <span
                    className={`grid h-14 w-14 shrink-0 place-items-center border-3 border-ink ${FILL[c.color]} halftone text-ink/25`}
                  >
                    <Icon name="Layers" className="relative h-6 w-6 text-ink" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-sm uppercase">{c.title}</h3>
                      <Tag color={c.color}>{c.level}</Tag>
                    </div>
                    <div className="mt-2">
                      <div className="mb-1 flex justify-between font-mono text-[10px] font-bold uppercase">
                        <span>{Math.round((c.progress / 100) * c.missions)} / {c.missions} missions</span>
                        <span>{c.progress}%</span>
                      </div>
                      <Progress value={c.progress} color={c.color} />
                    </div>
                  </div>
                  <Btn color="card" icon="Play" className="shrink-0">
                    Resume
                  </Btn>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <div>
            <SectionTitle>Telemetry Overview</SectionTitle>
            <div className="space-y-3">
              {[
                ['Missions in progress', enrolled.length, 'blue', 'Rocket'],
                ['Quizzes attempted', 12, 'red', 'ListChecks'],
                ['Avg mastery score', '88%', 'yellow', 'Award'],
              ].map(([label, value, color, icon]) => (
                <Card key={label} color={color} className="flex items-center justify-between p-4">
                  <span className="flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-wider">
                    <Icon name={icon} className="h-4 w-4" />
                    {label}
                  </span>
                  <span className="font-display text-xl leading-none">{value}</span>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>Recent Activity</SectionTitle>
            <Card className="divide-y-3 divide-ink">
              {[
                ['Cleared Backprop quiz', '2 hr ago', 'CheckCircle2'],
                ['Started NLP mission 04', 'Yesterday', 'Play'],
                ['Unlocked Neural Explorer', '3 days ago', 'Award'],
              ].map(([text, when, icon]) => (
                <div key={text} className="flex items-center gap-3 p-3.5">
                  <span className="border-3 border-ink bg-yellow p-1.5">
                    <Icon name={icon} className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold">{text}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{when}</div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
