import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { courses, categories, featuredCourse } from '../data/mock';
import { Card, Btn, Tag, Chip, Icon, PageHead, SectionTitle, Progress } from '../components/ui';
import CourseCard from '../components/CourseCard';
import { Thumb } from '../components/Thumb';

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const list = useMemo(() => {
    const q = queryParam.trim().toLowerCase();
    return courses.filter((c) => {
      const okCat = cat === 'All' || c.category === cat;
      const okQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));
      return okCat && okQ;
    });
  }, [queryParam, cat]);

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHead
        boxed={true}
        eyebrow="Course Portal"
        icon="BookOpen"
        badge="6 Tracks Live"
        title="Multiverse Course Portal"
        sub="Search a topic, pick a timeline, launch the mission chain."
      />

      {queryParam && (
        <div className="flex items-center justify-between rounded-lg border-3 border-ink bg-yellow px-4 py-3 shadow-nbsm">
          <div className="font-display text-sm uppercase">
            Showing results for: <span className="text-red">{queryParam}</span>
          </div>
          <button 
            onClick={() => setSearchParams({})} 
            className="rounded-full border-2 border-ink bg-card p-1 hover:bg-red hover:text-onaccent transition-colors"
          >
            <Icon name="X" className="h-4 w-4" />
          </button>
        </div>
      )}

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
            <h2 className="mt-4 font-display text-2xl uppercase leading-none sm:text-3xl">
              {featuredCourse.title}
            </h2>
            <p className="mt-3 max-w-lg text-sm font-semibold text-ink/85">{featuredCourse.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {featuredCourse.tags.map((t) => (
                <Tag key={t} color="card">
                  {t}
                </Tag>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn color="yellow" icon="Rocket" onClick={() => navigate(`/pre-quiz?video_id=${featuredCourse.missions?.[0]?.youtubeId || 'REPLACE_ME'}&title=${encodeURIComponent(featuredCourse.title)}&courseId=${featuredCourse.id}`)}>
                Launch mission
              </Btn>
              <Btn color="card" icon="Eye" onClick={() => setSelected(courses[0])}>
                View concepts
              </Btn>
            </div>
          </div>
          <div className="relative border-t-3 border-ink md:border-l-3 md:border-t-0">
            <Thumb course={featuredCourse} />
          </div>
        </div>
      </Card>

      {/* Grid */}
      <div>
        <SectionTitle icon="ListVideo" right={<span className="rounded-lg border-3 border-ink bg-card px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ink shadow-nbsm">{list.length} results</span>}>
          All Missions
        </SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
        {list.length === 0 && (
          <div className="rounded-xl border-3 border-ink bg-card p-12 text-center shadow-nbsm">
            <Icon name="Inbox" className="mx-auto h-12 w-12 text-muted mb-4" />
            <h3 className="font-display text-xl uppercase">No matches found</h3>
            <p className="mt-2 text-sm font-medium text-muted">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-xl border-3 border-ink bg-card shadow-nblg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative border-b-3 border-ink">
              <Thumb course={selected} />
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-30 rounded-lg border-3 border-ink bg-card p-1.5 text-ink shadow-nbsm hover:bg-yellow hover:scale-105 transition-all"
                aria-label="Close"
              >
                <Icon name="X" className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5">
              <h2 className="mb-2 font-display text-2xl uppercase leading-none text-ink">
                {selected.title}
              </h2>
              <p className="text-sm font-semibold text-muted">{selected.blurb}</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  ['Missions', selected.missions?.length || 0],
                  ['Depth', `${selected.hours} hr`],
                  ['Level', selected.level],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg border-3 border-ink bg-paper p-3 text-center">
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
                  <div key={t} className="flex items-center gap-3 rounded-lg border-3 border-ink bg-paper px-3 py-2">
                    <span className="grid h-6 w-6 place-items-center rounded-lg border-3 border-ink bg-yellow font-mono text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm font-bold uppercase">{t}</span>
                    <Icon name="ChevronRight" className="ml-auto h-4 w-4" />
                  </div>
                ))}
              </div>
              <Btn color="red" icon="Rocket" className="mt-5 w-full" onClick={() => navigate(`/pre-quiz?video_id=${selected.missions?.[0]?.youtubeId || 'REPLACE_ME'}&title=${encodeURIComponent(selected.title)}&courseId=${selected.id}`)}>
                Launch mission
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
