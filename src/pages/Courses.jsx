import React, { useState, useMemo } from 'react';
import { courses, categories, featuredCourse } from '../data/mock';
import { Card, Btn, Tag, Chip, Search, Icon, PageHead, SectionTitle, Progress, FILL } from '../components/ui';

export default function Courses() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const okCat = cat === 'All' || c.category === cat;
      const okQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));
      return okCat && okQ;
    });
  }, [query, cat]);

  return (
    <div className="space-y-8">
      <PageHead
        eyebrow="Course Portal"
        badge="6 Tracks Live"
        title="Multiverse Course Portal"
        sub="Search a topic, pick a timeline, launch the mission chain."
      />

      <Search
        value={query}
        onChange={setQuery}
        placeholder="Search topics — neural networks, NLP, XSS…"
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
            {c}
          </Chip>
        ))}
      </div>

      {/* Featured */}
      <Card color="blue" className="overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
          <div className="p-6 sm:p-8">
            <Tag color="yellow">Featured multiverse mission</Tag>
            <h2 className="mt-3 font-display text-2xl uppercase leading-none sm:text-3xl">
              {featuredCourse.title}
            </h2>
            <p className="mt-3 max-w-lg text-sm font-semibold text-white/85">{featuredCourse.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {featuredCourse.tags.map((t) => (
                <Tag key={t} color="card">
                  {t}
                </Tag>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn color="yellow" icon="Rocket">
                Launch mission
              </Btn>
              <Btn color="card" icon="Eye" onClick={() => setSelected(courses[0])}>
                View concepts
              </Btn>
            </div>
          </div>
          <div className="halftone flex flex-col justify-center gap-4 border-t-3 border-ink bg-red p-6 text-white/25 md:border-l-3 md:border-t-0">
            <div className="relative">
              <div className="font-display text-5xl leading-none text-white">{featuredCourse.missions}</div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-white">
                Missions in chain
              </div>
            </div>
            <div className="relative">
              <div className="font-display text-5xl leading-none text-white">{featuredCourse.hours}h</div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-white">
                Estimated depth
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid */}
      <div>
        <SectionTitle right={<span className="eyebrow text-muted">{list.length} results</span>}>
          All Missions
        </SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => (
            <Card key={c.id} hover className="flex flex-col">
              <div className={`${FILL[c.color]} halftone border-b-3 border-ink px-4 py-5 text-ink/20`}>
                <div className="relative flex items-center justify-between">
                  <Tag color="card">{c.category}</Tag>
                  {c.enrolled && <Tag color="card">Enrolled</Tag>}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-base uppercase leading-tight">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm font-medium text-muted">{c.blurb}</p>
                {c.enrolled && (
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between font-mono text-[10px] font-bold uppercase">
                      <span>Progress</span>
                      <span>{c.progress}%</span>
                    </div>
                    <Progress value={c.progress} color={c.color} />
                  </div>
                )}
                <div className="mt-4 flex gap-2">
                  <Btn color={c.color} className="flex-1" onClick={() => setSelected(c)}>
                    View
                  </Btn>
                  <Btn color="card" icon="Play" className="px-3" aria-label="Launch" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto border-3 border-ink bg-card shadow-nblg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${FILL[selected.color]} halftone flex items-start justify-between border-b-3 border-ink p-5 text-ink/20`}>
              <div className="relative">
                <Tag color="card">{selected.category}</Tag>
                <h2 className="mt-2 font-display text-2xl uppercase leading-none text-ink">
                  {selected.title}
                </h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="relative border-3 border-ink bg-card p-1.5 text-ink shadow-nbsm"
                aria-label="Close"
              >
                <Icon name="X" className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm font-semibold text-muted">{selected.blurb}</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  ['Missions', selected.missions],
                  ['Depth', `${selected.hours} hr`],
                  ['Level', selected.level],
                ].map(([k, v]) => (
                  <div key={k} className="border-3 border-ink bg-paper p-3 text-center">
                    <div className="font-display text-lg leading-none">{v}</div>
                    <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest text-muted">
                      {k}
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="mt-5 font-display text-sm uppercase">Concept nodes</h3>
              <div className="mt-2 space-y-2">
                {selected.tags.map((t, i) => (
                  <div key={t} className="flex items-center gap-3 border-3 border-ink bg-paper px-3 py-2">
                    <span className="grid h-6 w-6 place-items-center border-3 border-ink bg-yellow font-mono text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm font-bold">{t}</span>
                    <Icon name="ChevronRight" className="ml-auto h-4 w-4" />
                  </div>
                ))}
              </div>
              <Btn color="red" icon="Rocket" className="mt-5 w-full">
                Launch mission
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
