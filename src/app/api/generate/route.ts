import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generatePosts } from '@/lib/ai';
import { PLANS } from '@/lib/constants';
import type { PlanName, PlatformId } from '@/lib/constants';

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', user.id)
    .single();

  const plan = ((subscription?.plan ?? 'free') as PlanName);
  const limit = PLANS[plan].generationsPerMonth;

  if (limit !== Infinity) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from('usage_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfMonth.toISOString());

    if ((count ?? 0) >= limit) {
      return NextResponse.json(
        { error: 'Monthly generation limit reached. Please upgrade your plan.' },
        { status: 429 }
      );
    }
  }

  const body = await req.json();
  const { content, platforms } = body as { content: string; platforms: PlatformId[] };

  if (!content?.trim() || !platforms?.length) {
    return NextResponse.json({ error: 'Missing content or platforms' }, { status: 400 });
  }

  const results = await generatePosts(content, platforms);

  await supabase.from('usage_logs').insert({
    user_id: user.id,
    platforms,
    input_length: content.length,
  });

  return NextResponse.json({ results });
}
