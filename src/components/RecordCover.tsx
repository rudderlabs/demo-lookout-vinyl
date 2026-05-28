interface RecordCoverProps {
  artist: string;
  title: string;
  accent: string;
  ink: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'aspect-square text-xs p-3',
  md: 'aspect-square text-sm p-5',
  lg: 'aspect-square text-base p-8',
};

export function RecordCover({
  artist,
  title,
  accent,
  ink,
  size = 'md',
}: RecordCoverProps): React.JSX.Element {
  return (
    <div
      className={`${sizeClasses[size]} flex flex-col justify-between border border-white/5 shadow-2xl`}
      style={{ backgroundColor: accent, color: ink }}
    >
      <div className="text-[0.65em] uppercase tracking-[0.2em] opacity-70">
        Wax &amp; Wane
      </div>
      <div className="flex flex-col gap-1">
        <div
          className="font-serif leading-tight"
          style={{ fontSize: size === 'lg' ? '2.5em' : '1.5em' }}
        >
          {title}
        </div>
        <div className="text-[0.7em] uppercase tracking-wider opacity-80">
          {artist}
        </div>
      </div>
    </div>
  );
}
