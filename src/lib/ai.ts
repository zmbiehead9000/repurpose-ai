import OpenAI from 'openai';
import { type PlatformId, PLATFORMS } from './constants';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PLATFORM_INSTRUCTIONS: Record<PlatformId, string> = {
  twitter: `Write a Twitter/X thread (3-5 tweets). Each tweet ≤280 chars. Number them 1/, 2/, etc.
Rules: sound like a real person talking, not a blog post. Short punchy sentences. No buzzwords like "delve", "crucial", "game-changer", "leverage", or "in today's world". No emojis unless it feels natural. Start with something that stops the scroll — a bold statement, surprising fact, or hot take.`,

  linkedin: `Write a LinkedIn post (150-250 words).
Rules: write like you're texting a smart friend, not writing a press release. No "I'm excited to share", no "In today's fast-paced world", no corporate speak. Use very short paragraphs (1-2 sentences max). Start with a one-liner that hits hard. Be direct and a little opinionated. End with a real question people actually want to answer.`,

  instagram: `Write an Instagram caption (80-120 words).
Rules: casual, real, like a person wrote it at 11pm not a marketing team. No fluff. Get to the point fast. Can be slightly vulnerable or funny. End with 5-8 hashtags that are actually relevant (not generic like #instagood).`,

  youtube: `Write a YouTube video description (150-250 words).
Rules: first 2 lines must make someone want to click — treat it like ad copy. Then explain what they'll learn/see in plain language. Include a timestamps section with 4-5 realistic chapters. End with a casual subscribe line (not "Don't forget to like and subscribe!"). Add 5 hashtags at the bottom.`,
};

export async function generatePosts(
  content: string,
  platforms: PlatformId[]
): Promise<Record<PlatformId, string>> {
  const platformInstructions = platforms
    .map((p) => {
      const label = PLATFORMS.find((pl) => pl.id === p)?.label ?? p;
      return `--- ${label.toUpperCase()} ---\n${PLATFORM_INSTRUCTIONS[p]}`;
    })
    .join('\n\n');

  const prompt = `You are a content writer who sounds like a real human — not an AI, not a marketer. You write the way people actually talk online. No fluff, no corporate language, no "In conclusion", no "It's important to note". Just real, direct, engaging content.

Repurpose the content below into posts for each platform. Return ONLY the posts separated by the platform headers exactly as shown. Do not add any intro or explanation.

ORIGINAL CONTENT:
${content.slice(0, 8000)}

GENERATE POSTS FOR THESE PLATFORMS:
${platformInstructions}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 2000,
    temperature: 0.9,
  });

  const raw = response.choices[0].message.content ?? '';

  const results: Partial<Record<PlatformId, string>> = {};
  for (const platform of platforms) {
    const label = PLATFORMS.find((p) => p.id === platform)?.label ?? platform;
    const header = `--- ${label.toUpperCase()} ---`;
    const nextHeaders = platforms
      .filter((p) => p !== platform)
      .map((p) => `--- ${(PLATFORMS.find((pl) => pl.id === p)?.label ?? p).toUpperCase()} ---`);

    const start = raw.indexOf(header);
    if (start === -1) { results[platform] = ''; continue; }

    let end = raw.length;
    for (const next of nextHeaders) {
      const pos = raw.indexOf(next, start + header.length);
      if (pos !== -1 && pos < end) end = pos;
    }

    results[platform] = raw.slice(start + header.length, end).trim();
  }

  return results as Record<PlatformId, string>;
}
