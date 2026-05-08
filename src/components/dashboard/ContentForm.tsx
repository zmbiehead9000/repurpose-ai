'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import PlatformSelector from './PlatformSelector';
import ResultsPanel from './ResultsPanel';
import type { PlatformId } from '@/lib/constants';

const MAX_CHARS = 8000;

export default function ContentForm() {
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState<PlatformId[]>(['twitter', 'linkedin']);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Partial<Record<PlatformId, string>> | null>(null);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setResults(null);
    setLoading(true);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, platforms }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? 'Something went wrong. Please try again.');
    } else {
      setResults(data.results);
    }

    setLoading(false);
  }

  const isLimitError = error.includes('limit reached');

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-gray-300">Your content</label>
            <span className={`text-xs ${content.length > MAX_CHARS * 0.9 ? 'text-yellow-400' : 'text-gray-500'}`}>
              {content.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </span>
          </div>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
            rows={8}
            placeholder="Paste your blog post, YouTube transcript, podcast notes, or any long-form content here…"
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm resize-none leading-relaxed"
          />
        </div>

        <PlatformSelector selected={platforms} onChange={setPlatforms} />

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
            {error}
            {isLimitError && (
              <span>
                {' '}
                <Link href="/pricing" className="underline text-red-300 hover:text-red-200">
                  Upgrade your plan
                </Link>
              </span>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !content.trim() || platforms.length === 0}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? 'Generating…' : `Generate ${platforms.length > 0 ? platforms.length : ''} Post${platforms.length !== 1 ? 's' : ''}`}
        </button>
      </form>

      {results && <ResultsPanel results={results} />}
    </div>
  );
}
