export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    generationsPerMonth: 5,
    stripePriceId: null,
  },
  pro: {
    name: 'Pro',
    price: 29,
    generationsPerMonth: 100,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? null,
  },
  business: {
    name: 'Business',
    price: 79,
    generationsPerMonth: Infinity,
    stripePriceId: process.env.STRIPE_BUSINESS_PRICE_ID ?? null,
  },
} as const;

export type PlanName = keyof typeof PLANS;

export const PLATFORMS = [
  { id: 'twitter',   label: 'Twitter / X',        charLimit: 280  },
  { id: 'linkedin',  label: 'LinkedIn',            charLimit: 3000 },
  { id: 'instagram', label: 'Instagram Caption',   charLimit: 2200 },
  { id: 'youtube',   label: 'YouTube Description', charLimit: 5000 },
] as const;

export type PlatformId = typeof PLATFORMS[number]['id'];
