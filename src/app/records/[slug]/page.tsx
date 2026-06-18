import { notFound } from 'next/navigation';
import { records, getRecord } from '@/data/records';
import { RecordCover } from '@/components/RecordCover';
import { TrackPreview } from '@/components/TrackPreview';
import { NotifyRestockForm } from '@/components/NotifyRestockForm';
import { AddToCartButton } from './AddToCartButton';
import { RecordDetailAnalytics } from './RecordDetailAnalytics';

export function generateStaticParams() {
  return records.map((record) => ({ slug: record.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RecordDetailPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const record = getRecord(slug);
  if (!record) notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Client island fires Record Viewed on mount */}
      <RecordDetailAnalytics record={record} />

      <div>
        <RecordCover
          artist={record.artist}
          title={record.title}
          accent={record.coverAccent}
          ink={record.coverInk}
          size="lg"
        />
      </div>

      <div className="flex flex-col">
        <div className="text-xs uppercase tracking-[0.2em] text-amber-200/80 mb-3">
          {record.genre.replace('-', ' ')} &middot; {record.releaseYear} &middot;{' '}
          {record.format}
        </div>
        <h1 className="font-serif text-4xl text-stone-100 leading-tight">
          {record.title}
        </h1>
        <div className="text-stone-300 mt-1">{record.artist}</div>
        <div className="text-xs text-stone-500 mt-1">{record.label}</div>

        <p className="text-stone-400 mt-6 leading-relaxed">{record.blurb}</p>

        <div className="mt-6 text-xs uppercase tracking-wider text-stone-500">
          Tracklist
        </div>
        <div className="mt-2 mb-8 border-t border-white/5">
          {record.tracks.map((track) => (
            <TrackPreview
              key={track.number}
              track={track}
              recordId={record.id}
              recordTitle={record.title}
            />
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-baseline justify-between mb-4">
            <div className="font-serif text-3xl text-stone-100">
              ${record.priceUsd}
            </div>
            <div className="text-xs text-stone-500">
              {record.inStock ? 'In stock' : 'Sold out'}
            </div>
          </div>
          {record.inStock ? (
            <AddToCartButton record={record} />
          ) : (
            <NotifyRestockForm
              recordId={record.id}
              recordTitle={record.title}
            />
          )}
        </div>
      </div>
    </div>
  );
}
