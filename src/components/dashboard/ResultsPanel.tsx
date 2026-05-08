import { PLATFORMS, type PlatformId } from '@/lib/constants';
import CopyButton from './CopyButton';

const ICONS: Record<PlatformId, string> = {
  twitter: '𝕏',
  linkedin: 'in',
  instagram: '📷',
  youtube: '▶',
};

interface Props {
  results: Partial<Record<PlatformId, string>>;
}

export default function ResultsPanel({ results }: Props) {
  const entries = (Object.entries(results) as [PlatformId, string][]).filter(([, v]) => v);

  if (!entries.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-white font-semibold text-lg">Generated Posts</h2>
      {entries.map(([platformId, text]) => {
        const platform = PLATFORMS.find((p) => p.id === platformId);
        return (
          <div key={platformId} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">{ICONS[platformId]}</span>
                <span className="text-white font-medium text-sm">{platform?.label}</span>
                <span className="text-gray-500 text-xs">{text.length} chars</span>
              </div>
              <CopyButton text={text} />
            </div>
            <pre className="px-5 py-4 text-gray-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
              {text}
            </pre>
          </div>
        );
      })}
    </div>
  );
}
