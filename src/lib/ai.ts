import OpenAI from 'openai';
import { type PlatformId, PLATFORMS } from './constants';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PLATFORM_INSTRUCTIONS: Record<PlatformId, string> = {
  twitter: `Write a punchy Twitter/X thread (3-5 tweets). Each tweet ≤280 chars.
Start with a hook. Use line breaks between tweets. Number them 1/, 2/, etc.`,
  linkedin: `Write a professional LinkedIn post (150-300 words).
Start with a strong hook line. Use short paragraphs.
End with a thought-provoking question or call to action.`,
  instagram: `Write an Instagram caption (100-150 words).
Conversational and engaging. End with 5-10 relevant hashtags.`,
  youtube: `Write a YouTube video description (200-300 words).
Start with 2 sentences summarizing the video.
Include a timestamps section (make up 4-5 realistic ones).
End with a subscribe CTA and 5 hashtags.`,
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

  const prompt = `You are a social media expert. Repurpose the following content into posts for each platform listed below. Return ONLY the posts, separated by the platform headers exactly as shown.

ORIGINAL CONTENT:
${content.slice(0, 8000)}

GENERATE POSTS FOR THESE PLATFORMS:
${platformInstructions}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 2000,
    temperature: 0.7,
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
