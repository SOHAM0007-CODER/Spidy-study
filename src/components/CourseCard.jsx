import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Btn, FILL } from './ui';

export default function CourseCard({ course }) {
  const [error, setError] = useState(false);
  const firstMission = course.missions?.[0];
  const youtubeId = firstMission?.youtubeId;
  const customThumb = course.thumbnail;

  const showPlaceholder = !customThumb && (!youtubeId || youtubeId === 'REPLACE_ME' || error);
  const imgSrc = customThumb || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  const tags = course.tags || [];
  const visibleTags = tags.slice(0, 2);
  const hiddenCount = tags.length - 2;

  const stats = course.stats || { views: '0', likes: '0', comments: '0' };

  return (
    <Link 
      to={`/pre-quiz?video_id=${youtubeId || 'REPLACE_ME'}&title=${encodeURIComponent(course.title)}&courseId=${course.id}`}
      className="group flex flex-col rounded-xl border-3 border-ink bg-card shadow-nbsm transition-all duration-100 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-nb overflow-hidden"
    >
      {/* Thumbnail Block */}
      <div className={`relative aspect-video w-full overflow-hidden border-b-3 border-ink ${FILL[course.color] || 'bg-yellow'}`}>
        {/* Top-Left: EarthCode */}
        <div className="absolute top-3 left-3 z-20 rounded-lg border-3 border-ink bg-yellow px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-ink shadow-nbsm">
          {course.earthCode || 'EARTH-0000'}
        </div>
        {/* Top-Right: Category */}
        <div className="absolute top-3 right-3 z-20 rounded-lg border-3 border-ink bg-card px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-ink shadow-nbsm">
          {course.category}
        </div>
        {/* Bottom-Right: Runtime */}
        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-full border-3 border-ink bg-ink px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-widest text-card shadow-nbsm">
          <Icon name="Clock" className="h-3 w-3" />
          {course.runtime || '0:00'}
        </div>

        {showPlaceholder ? (
          <div className="halftone absolute inset-0 flex flex-col items-center justify-center text-ink/20">
            <Icon name="Video" className="h-10 w-10 mb-2 opacity-50" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-50">Signal Lost</span>
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={course.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            onError={() => setError(true)}
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-3 border-ink font-display text-sm text-ink shadow-nbsm ${FILL[course.channelColor] || 'bg-yellow'}`}>
            {course.channelInitials || 'CH'}
          </div>
          <div>
            <h3 className="font-display text-lg uppercase leading-tight line-clamp-2">
              {course.title}
            </h3>
            <div className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
              {course.channel || 'Unknown Channel'}
            </div>
          </div>
        </div>

        <div className="my-3 border-b-3 border-ink" />

        <div className="flex flex-1 flex-col justify-end">
          <div className="flex items-center gap-2 mb-3">
            {visibleTags.map(t => (
              <span key={t} className="rounded-lg border-3 border-ink bg-paper px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-ink">
                {t}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className="rounded-lg border-3 border-ink bg-paper px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-ink">
                +{hiddenCount}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between px-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ink opacity-80">
            <div className="flex items-center gap-1.5"><Icon name="Eye" className="h-3.5 w-3.5"/> {stats.views}</div>
            <div className="flex items-center gap-1.5"><Icon name="ThumbsUp" className="h-3.5 w-3.5"/> {stats.likes}</div>
            <div className="flex items-center gap-1.5"><Icon name="MessageSquare" className="h-3.5 w-3.5"/> {stats.comments}</div>
          </div>

          <Btn color="red" className="w-full mt-4" icon="Play" tabIndex={-1}>
            Launch Mission
          </Btn>
        </div>
      </div>
    </Link>
  );
}
