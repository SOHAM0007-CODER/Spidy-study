import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courses } from '../data/mock';
import { Card, Btn, Tag, Chip, Icon, Progress, FILL } from '../components/ui';
import { Quiz } from '../components/Quiz';

export default function Mission() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === courseId);

  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('adaptlearn-progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('NOTES'); // 'NOTES' | 'QUIZ'

  useEffect(() => {
    localStorage.setItem('adaptlearn-progress', JSON.stringify(progress));
  }, [progress]);

  if (!course) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl uppercase text-ink">Course not found</h2>
          <Btn className="mt-4" onClick={() => navigate('/courses')}>
            Back to courses
          </Btn>
        </div>
      </div>
    );
  }

  const courseProgress = progress[courseId] || { completedMissionIds: [], quizScore: null };
  const missions = course.missions || [];
  const activeMission = missions[activeIdx];
  const percentComplete = Math.round((courseProgress.completedMissionIds.length / missions.length) * 100) || 0;
  
  const isCompleted = (missionId) => courseProgress.completedMissionIds.includes(missionId);

  const toggleCompletion = (missionId) => {
    setProgress((prev) => {
      const currentCourse = prev[courseId] || { completedMissionIds: [], quizScore: null };
      const set = new Set(currentCourse.completedMissionIds);
      if (set.has(missionId)) set.delete(missionId);
      else set.add(missionId);
      return {
        ...prev,
        [courseId]: { ...currentCourse, completedMissionIds: Array.from(set) }
      };
    });
  };

  const handleQuizFinish = (score) => {
    setProgress((prev) => {
      const currentCourse = prev[courseId] || { completedMissionIds: [], quizScore: null };
      return {
        ...prev,
        [courseId]: { ...currentCourse, quizScore: Math.max(currentCourse.quizScore || 0, score) }
      };
    });
  };

  const hasQuiz = course.quiz && course.quiz.length > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Column */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-muted">
          <Link to="/courses" className="flex items-center gap-1 hover:text-ink transition-colors">
            <Icon name="ArrowLeft" className="h-4 w-4" /> Back
          </Link>
          <span className="text-ink/20">/</span>
          <span>{course.title}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Progress value={percentComplete} color={course.color} />
          </div>
          <span className="font-mono text-[10px] font-bold uppercase w-12 text-right">{percentComplete}%</span>
        </div>

        {/* Player */}
        <div className={`relative aspect-video w-full border-3 border-ink bg-card shadow-nbsm overflow-hidden ${FILL[course.color]}`}>
          {activeMission?.youtubeId === 'REPLACE_ME' || !activeMission?.youtubeId ? (
            course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="halftone absolute inset-0 flex flex-col items-center justify-center text-ink/20">
                <Icon name="Video" className="h-16 w-16 mb-4 opacity-50" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-50">Video Placeholder</span>
              </div>
            )
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${activeMission.youtubeId}`}
              title={activeMission.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-none"
            ></iframe>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Tag color="card">{activeMission?.minutes} min</Tag>
            {isCompleted(activeMission?.id) && <Tag color="lime">Completed</Tag>}
          </div>
          <h1 className="font-display text-3xl uppercase leading-none md:text-4xl">{activeMission?.title}</h1>
          <p className="mt-3 text-base font-medium text-muted max-w-3xl">{activeMission?.summary}</p>
        </div>

        {/* Tabs */}
        <div className="pt-4 flex gap-2 border-b-3 border-ink pb-4">
          <Chip active={activeTab === 'NOTES'} onClick={() => setActiveTab('NOTES')}>
            Mission Notes
          </Chip>
          {hasQuiz && (
            <Chip active={activeTab === 'QUIZ'} onClick={() => setActiveTab('QUIZ')}>
              Concept Quiz {courseProgress.quizScore !== null ? `(${courseProgress.quizScore}/${course.quiz.length})` : ''}
            </Chip>
          )}
        </div>

        {/* Tab Content */}
        <div className="pb-24">
          {activeTab === 'NOTES' && (
            <Card color="paper" className="p-6">
              <h3 className="font-display text-lg uppercase mb-4">Key Takeaways</h3>
              <ul className="space-y-2">
                {activeMission?.notes?.map((note, i) => (
                  <li key={i} className="flex gap-3 text-sm font-semibold">
                    <span className="text-yellow mt-0.5">■</span> {note}
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {activeTab === 'QUIZ' && hasQuiz && (
            <Quiz questions={course.quiz} courseId={courseId} onFinish={handleQuizFinish} />
          )}
        </div>

        {/* Sticky Footer */}
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:left-[240px] xl:left-[280px]">
          <div className="border-t-3 border-ink bg-card p-4 shadow-[0_-4px_0_rgba(0,0,0,0.1)] flex items-center justify-between">
            <Btn
              color="card"
              icon="ArrowLeft"
              disabled={activeIdx === 0}
              onClick={() => setActiveIdx(p => Math.max(0, p - 1))}
            >
              Previous
            </Btn>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`grid h-6 w-6 place-items-center border-2 border-ink transition-colors ${isCompleted(activeMission?.id) ? 'bg-lime' : 'bg-card group-hover:bg-yellow'}`}>
                {isCompleted(activeMission?.id) && <Icon name="Check" className="h-4 w-4" />}
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Mark completed</span>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={isCompleted(activeMission?.id)}
                onChange={() => toggleCompletion(activeMission?.id)}
              />
            </label>

            <Btn
              color="card"
              className="flex-row-reverse"
              icon="ArrowRight"
              disabled={activeIdx === missions.length - 1}
              onClick={() => setActiveIdx(p => Math.min(missions.length - 1, p + 1))}
            >
              Next
            </Btn>
          </div>
        </div>
      </div>

      {/* Right Rail */}
      <div className="w-full lg:w-[320px] shrink-0 mb-32 lg:mb-0">
        <h3 className="font-display text-lg uppercase mb-4">Mission Chain</h3>
        <div className="space-y-3">
          {missions.map((m, i) => {
            const isActive = i === activeIdx;
            const completed = isCompleted(m.id);
            
            let bgClass = 'bg-card';
            let textClass = 'text-ink';
            if (isActive) {
              bgClass = 'bg-ink shadow-nbsm';
              textClass = 'text-paper';
            } else if (completed) {
              bgClass = 'bg-lime/20';
            }

            return (
              <button
                key={m.id}
                onClick={() => setActiveIdx(i)}
                className={`w-full text-left border-3 border-ink p-3 flex gap-4 items-start transition-all ${bgClass} hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-nb active:translate-x-0 active:translate-y-0 active:shadow-nbsm`}
              >
                <div className={`grid h-6 w-6 shrink-0 place-items-center border-2 ${isActive ? 'border-paper text-paper' : 'border-ink'} font-mono text-[10px] font-bold ${completed && !isActive ? 'bg-lime text-ink border-ink' : ''}`}>
                  {completed ? <Icon name="Check" className="h-4 w-4" /> : i + 1}
                </div>
                <div>
                  <div className={`text-sm font-bold leading-tight ${textClass}`}>{m.title}</div>
                  <div className={`mt-1 font-mono text-[9px] uppercase tracking-widest ${isActive ? 'text-paper/70' : 'text-muted'}`}>
                    {m.minutes} min
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
