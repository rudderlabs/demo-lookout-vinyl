'use client';

import { useEffect, useRef, useState } from 'react';
import { formatDuration, type Track } from '@/data/records';
import { trackTrackPreviewed } from '@/lib/analytics';

const PREVIEW_MS = 10_000;

interface TrackPreviewProps {
  track: Track;
  recordId: string;
}

export function TrackPreview({ track, recordId }: TrackPreviewProps): React.JSX.Element {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const startedAtRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    startedAtRef.current = performance.now();

    function tick(now: number): void {
      if (startedAtRef.current === null) return;
      const elapsed = now - startedAtRef.current;
      const pct = Math.min(100, (elapsed / PREVIEW_MS) * 100);
      setProgress(pct);
      if (elapsed >= PREVIEW_MS) {
        setPlaying(false);
        setProgress(0);
        trackTrackPreviewed({
          record_id: recordId,
          track_number: track.number,
          track_title: track.title,
          play_duration_ms: PREVIEW_MS,
          completed: true,
        });
        startedAtRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, recordId, track]);

  function handleToggle(): void {
    if (playing) {
      const elapsed =
        startedAtRef.current !== null
          ? Math.round(performance.now() - startedAtRef.current)
          : 0;
      trackTrackPreviewed({
        record_id: recordId,
        track_number: track.number,
        track_title: track.title,
        play_duration_ms: elapsed,
        completed: false,
      });
      setPlaying(false);
      setProgress(0);
      startedAtRef.current = null;
    } else {
      setPlaying(true);
    }
  }

  return (
    <div className="flex items-center gap-4 py-2 border-b border-white/5 last:border-b-0">
      <button
        type="button"
        onClick={handleToggle}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-amber-200/30 text-amber-200/80 hover:bg-amber-200/10 transition shrink-0"
        aria-label={playing ? `Stop preview of ${track.title}` : `Preview ${track.title}`}
      >
        {playing ? (
          <span className="block w-2 h-2 bg-amber-200/80" />
        ) : (
          <span className="ml-0.5 inline-block w-0 h-0 border-l-[6px] border-l-amber-200/80 border-y-[4px] border-y-transparent" />
        )}
      </button>
      <span className="text-xs text-stone-400 w-6 tabular-nums">
        {String(track.number).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-stone-100 truncate">{track.title}</div>
        {playing && (
          <div className="mt-1.5 h-px bg-white/5 overflow-hidden">
            <div
              className="h-full bg-amber-200/80 transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      <span className="text-xs text-stone-500 tabular-nums shrink-0">
        {formatDuration(track.durationSeconds)}
      </span>
    </div>
  );
}
