import React, { useState } from 'react';
import { Tag, Icon, FILL } from './ui';

export function Thumb({ course }) {
  const [error, setError] = useState(false);
  const firstMission = course.missions?.[0];
  const youtubeId = firstMission?.youtubeId;
  const customThumb = course.thumbnail;

  const showPlaceholder = !customThumb && (!youtubeId || youtubeId === 'REPLACE_ME' || error);
  const imgSrc = customThumb || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <div className={`relative h-48 w-full overflow-hidden border-b-3 border-ink group ${FILL[course.color]}`}>
      {/* Category and Level Tags */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between">
        <Tag color="card">{course.category}</Tag>
        <Tag color="card">{course.level}</Tag>
      </div>

      {showPlaceholder ? (
        <div className="halftone absolute inset-0 flex flex-col items-center justify-center text-ink/20">
          <Icon name="Video" className="h-10 w-10 mb-2 opacity-50" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-50">Video not linked yet</span>
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={course.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          onError={() => setError(true)}
        />
      )}

      {/* Play Badge */}
      <div className="absolute bottom-4 left-4 z-20 grid h-8 w-8 place-items-center border-3 border-ink bg-card shadow-nbsm transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        <Icon name="Play" className="h-4 w-4 text-ink" />
      </div>
    </div>
  );
}
