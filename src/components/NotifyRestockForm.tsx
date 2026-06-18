'use client';

import { useState } from 'react';
import { useRudderAnalytics, trackRestockNotifyRequested } from '@/lib/analytics';

interface NotifyRestockFormProps {
  recordId: string;
  recordTitle: string;
}

export function NotifyRestockForm({
  recordId,
  recordTitle,
}: NotifyRestockFormProps): React.JSX.Element {
  const analytics = useRudderAnalytics();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (!email.trim()) return;
    if (analytics) {
      trackRestockNotifyRequested(analytics, { record_id: recordId, record_title: recordTitle });
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded border border-amber-200/30 bg-amber-200/5 p-4">
        <div className="text-sm text-amber-100">
          We&rsquo;ll let you know when{' '}
          <span className="font-medium">{recordTitle}</span> is back in stock.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className="text-xs uppercase tracking-wider text-stone-400">
        Notify me when restocked
      </label>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-200/50"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-amber-200/90 text-stone-950 text-sm font-medium rounded hover:bg-amber-200 transition"
        >
          Notify me
        </button>
      </div>
    </form>
  );
}
