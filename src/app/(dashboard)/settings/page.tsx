'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { PLANS } from '@/lib/constants';
import type { PlanName } from '@/lib/constants';
import type { UsageResponse } from '@/types';

export default function SettingsPage() {
  const supabaseRef = useRef(createClient());
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState<UsageResponse | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    supabaseRef.current.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
    });
    fetch('/api/usage').then((r) => r.json()).then(setUsage);
  }, []);

  async function handleManageBilling() {
    setPortalLoading(true);
    const res = await fetch('/api/stripe/portal', { method: 'POST' });
    const { url } = await res.json();
    if (url) window.location.href = url;
    else setPortalLoading(false);
  }

  async function handleUpgrade(priceId: string) {
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  }

  const plan = (usage?.plan ?? 'free') as PlanName;
  const planInfo = PLANS[plan];

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account and billing.</p>
      </div>

      {/* Account */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-white font-semibold">Account</h2>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Email</label>
          <p className="text-white text-sm">{email || '—'}</p>
        </div>
      </section>

      {/* Billing */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold">Billing</h2>

        <div className="flex items-center gap-3">
          <span className="text-white font-medium">{planInfo.name} Plan</span>
          <span className="text-xs bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full font-medium">
            {plan === 'free' ? 'Free' : `$${planInfo.price}/mo`}
          </span>
        </div>

        <p className="text-gray-400 text-sm">
          {plan === 'free'
            ? `${PLANS.free.generationsPerMonth} generations/month included.`
            : plan === 'pro'
            ? `${PLANS.pro.generationsPerMonth} generations/month.`
            : 'Unlimited generations/month.'}
        </p>

        {plan !== 'free' && (
          <button
            onClick={handleManageBilling}
            disabled={portalLoading}
            className="text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {portalLoading ? 'Redirecting…' : 'Manage Billing'}
          </button>
        )}

        {plan === 'free' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-400 font-medium">Upgrade your plan</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleUpgrade(PLANS.pro.stripePriceId ?? '')}
                className="bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                Pro — $29/mo
                <span className="block text-xs font-normal text-violet-200 mt-0.5">100 generations</span>
              </button>
              <button
                onClick={() => handleUpgrade(PLANS.business.stripePriceId ?? '')}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                Business — $79/mo
                <span className="block text-xs font-normal text-gray-400 mt-0.5">Unlimited</span>
              </button>
            </div>
          </div>
        )}

        {plan === 'pro' && (
          <div className="pt-2">
            <button
              onClick={() => handleUpgrade(PLANS.business.stripePriceId ?? '')}
              className="text-sm text-violet-400 hover:text-violet-300 underline"
            >
              Upgrade to Business (Unlimited) — $79/mo
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
