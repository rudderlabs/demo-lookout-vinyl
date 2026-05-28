import Link from 'next/link';
import { records } from '@/data/records';
import { RecordCover } from '@/components/RecordCover';

export default function HomePage(): React.JSX.Element {
  const featured = records.slice(0, 3);
  return (
    <>
      <section className="py-8">
        <div className="text-xs uppercase tracking-[0.2em] text-amber-200/80 mb-4">
          New &amp; recent
        </div>
        <h1 className="font-serif text-5xl text-stone-100 leading-tight max-w-2xl">
          Records for the slow listener.
        </h1>
        <p className="text-stone-400 mt-4 max-w-xl">
          Independent label out of a converted boathouse on the coast.
          Limited pressings, no streaming-first masters, vinyl only.
        </p>
        <Link
          href="/records"
          className="inline-block mt-8 px-5 py-2.5 bg-amber-200/90 text-stone-950 text-sm font-medium rounded hover:bg-amber-200 transition"
        >
          Browse the catalogue &rarr;
        </Link>
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl text-stone-100">Featured</h2>
          <Link
            href="/records"
            className="text-sm text-stone-400 hover:text-amber-200 transition"
          >
            See all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((record) => (
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
              <div className="mt-3">
                <div className="text-sm text-stone-100">{record.title}</div>
                <div className="text-xs text-stone-400 mt-0.5">
                  {record.artist}
                </div>
                <div className="text-xs text-amber-200/80 mt-1">
                  ${record.priceUsd}
                  {!record.inStock && (
                    <span className="ml-2 text-stone-500">&middot; sold out</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
