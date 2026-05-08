'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { UsageResponse } from '@/types';

export default function UsageMeter() {
  const [usage, setUsage] = useState<UsageResponse | null>(null);

  useEffect(() => {
    fetch('/api/usage')
      .then((r) => r.json())
      .then(setUsage)
      .catch(() => {});
  }, []);

  if (!usage) return null;

  const { used, limit, plan } = usage;
  const isUnlimited = limit === null;
  const pct = isUnlimited ? 0 : Math.min((used / limit!) * 100, 100);
  const isHigh = !isUnlimited && pct >= 80;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 flex items-center justify-between gap-6">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-400 mb-1.5">
          {isUnlimited ? (
            <span className="text-green-400 font-medium">Unlimited generations</span>
          ) : (
            <>
              <span className={isHigh ? 'text-red-400 font-medium' : 'text-white font-medium'}>
                {used}
              </span>
              <span className="text-gray-500"> / {limit} generations this month</span>
            </>
          )}
          <span className="ml-2 text-xs uppercase tracking-wide text-gray-600 font-semibold">
            {plan}
          </span>
        </p>
        {!isUnlimited && (
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isHigh ? 'bg-red-500' : 'bg-violet-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>

      {plan === 'free' && (
        <Link
          href="/pricing"
          className="shrink-0 text-xs bg-violet-600 hover:bg-violet-500 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          Upgrade
        </Link>
      )}
    </div>
  );
}
