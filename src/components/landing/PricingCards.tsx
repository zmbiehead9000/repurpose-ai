'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: null,
    description: 'Try it out — no card needed.',
    features: [
      '5 generations per month',
      'All 4 platforms',
      'Copy to clipboard',
    ],
    cta: 'Get Started Free',
    href: '/signup',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: 29,
    period: 'month',
    description: 'For creators and marketers.',
    features: [
      '100 generations per month',
      'All 4 platforms',
      'Copy to clipboard',
      'Priority support',
    ],
    cta: 'Start Pro',
    href: '/signup',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: 79,
    period: 'month',
    description: 'For agencies and power users.',
    features: [
      'Unlimited generations',
      'All 4 platforms',
      'Copy to clipboard',
      'Priority support',
      'Team-ready',
    ],
    cta: 'Start Business',
    href: '/signup',
    highlighted: false,
    badge: null,
  },
];

export default function PricingCards() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3 tracking-tight">
          Simple, transparent pricing
        </h2>
        <p className="text-gray-500 text-center text-sm mb-16">
          Start free. Upgrade when you need more. Cancel anytime.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-violet-600 to-violet-700 border-2 border-violet-400/60 shadow-2xl shadow-violet-900/50 scale-105'
                  : 'bg-gray-900/70 border border-gray-800/80 hover:border-gray-700'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-bold text-xl text-white mb-1">{plan.name}</h3>
                <p className={`text-sm ${plan.highlighted ? 'text-violet-200' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex items-end gap-1">
                <span className="text-5xl font-extrabold text-white leading-none">${plan.price}</span>
                {plan.period && (
                  <span className={`text-sm pb-1 ${plan.highlighted ? 'text-violet-200' : 'text-gray-500'}`}>
                    /{plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <div className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${plan.highlighted ? 'bg-white/20' : 'bg-violet-500/20'}`}>
                      <Check size={10} className={plan.highlighted ? 'text-white' : 'text-violet-400'} />
                    </div>
                    <span className={plan.highlighted ? 'text-violet-100' : 'text-gray-300'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`text-center font-semibold py-3 rounded-xl text-sm transition-all hover:-translate-y-px ${
                  plan.highlighted
                    ? 'bg-white text-violet-700 hover:bg-violet-50 shadow-md'
                    : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-900/30'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Money-back note */}
        <p className="text-center text-gray-600 text-xs mt-10">
          All paid plans come with a 7-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
}
