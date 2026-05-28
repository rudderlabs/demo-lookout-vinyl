import Link from 'next/link';
import { records } from '@/data/records';
import { RecordCover } from '@/components/RecordCover';

export default function RecordsPage(): React.JSX.Element {
  return (
    <>
      <div className="text-xs uppercase tracking-[0.2em] text-amber-200/80 mb-4">
        The catalogue
      </div>
      <h1 className="font-serif text-4xl text-stone-100">All records</h1>
      <p className="text-stone-400 mt-2">
        {records.length} releases. Listed by recency.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {records.map((record) => (
          <Link
            key={record.id}
            href={`/records/${record.slug}`}
            className="group"
          >
            <RecordCover
              artist={record.artist}
              title={record.title}
              accent={record.coverAccent}
              ink={record.coverInk}
              size="md"
            />
            <div className="mt-3 space-y-0.5">
              <div className="text-xs uppercase tracking-wider text-stone-500">
                {record.genre.replace('-', ' ')} &middot; {record.releaseYear}
              </div>
              <div className="text-sm text-stone-100">{record.title}</div>
              <div className="text-xs text-stone-400">{record.artist}</div>
              <div className="text-xs text-amber-200/80 pt-1">
                ${record.priceUsd}
                {!record.inStock && (
                  <span className="ml-2 text-stone-500">&middot; sold out</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
