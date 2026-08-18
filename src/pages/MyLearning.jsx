import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/mock';
import { Card, Btn, Tag, Chip, Icon, PageHead, SectionTitle, Progress, FILL } from '../components/ui';

const TABS = ['Enrolled', 'Completed'];

export default function MyLearning() {
  const [tab, setTab] = useState('Enrolled');
  const enrolled = courses.filter((c) => c.enrolled && c.progress < 100);
  const completed = courses.filter((c) => c.progress >= 100);
  const list = tab === 'Enrolled' ? enrolled : completed;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <PageHead
          eyebrow="Learning Wall"
          title="Your Multiverse History"
          boxed={false}
        />
        <div className="-mt-2 mb-8 border-b-3 border-ink w-full" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Main Content */}
        <div>
          <SectionTitle 
            icon="LayoutGrid"
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
            Enrolled & Completed Missions ({list.length})
          </SectionTitle>

          {list.length === 0 ? (
            <Card className="flex min-h-[280px] flex-col items-center justify-center p-8 text-center">
              <Icon name="BookOpen" className="mb-4 h-12 w-12 text-muted opacity-50" />
              <h3 className="mb-6 max-w-md font-sans text-sm font-bold uppercase text-ink">
                You haven't enrolled in any course missions yet.
              </h3>
              <Link to="/courses">
                <Btn color="red" icon="Compass">
                  Explore multiverse courses
                </Btn>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {list.map((c) => (
                <Card key={c.id} hover className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <span
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg border-3 border-ink ${FILL[c.color]} halftone text-ink/25`}
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
                        <span>{Math.round(((c.progress || 0) / 100) * (c.missions?.length || 0))} / {c.missions?.length || 0} missions</span>
                        <span>{c.progress || 0}%</span>
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
        <div className="space-y-8">
          <div>
            <SectionTitle icon="Trophy">Telemetry Overview</SectionTitle>
            <Card className="p-5">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="rounded-lg border-3 border-ink bg-paper p-4 text-center">
                  <div className="font-display text-3xl text-cyan">0</div>
                  <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">Missions</div>
                </div>
                <div className="rounded-lg border-3 border-ink bg-paper p-4 text-center">
                  <div className="font-display text-3xl text-red">0</div>
                  <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">Quizzes</div>
                </div>
              </div>
              <div className="rounded-lg border-3 border-ink bg-paper p-4 text-center">
                <div className="font-display text-3xl text-yellow">88%</div>
                <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">Average Mastery Score</div>
              </div>
            </Card>
          </div>

          <div>
            <SectionTitle icon="Clock">Recent Activity</SectionTitle>
            <Card className="p-6 text-center">
              <p className="text-sm italic text-muted">No recent activity recorded.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
