import type { PlanName, PlatformId } from '@/lib/constants';

export type { PlanName, PlatformId };

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  plan: PlanName;
  status: 'active' | 'canceled' | 'past_due';
  current_period_end: string | null;
}

export interface UsageLog {
  id: string;
  user_id: string;
  platforms: PlatformId[];
  input_length: number;
  created_at: string;
}

export interface GenerateRequest {
  content: string;
  platforms: PlatformId[];
}

export interface GenerateResponse {
  results: Record<PlatformId, string>;
}

export interface UsageResponse {
  used: number;
  limit: number | null;
  plan: PlanName;
}
