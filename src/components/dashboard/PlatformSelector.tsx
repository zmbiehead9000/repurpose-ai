'use client';

import { PLATFORMS, type PlatformId } from '@/lib/constants';
import clsx from 'clsx';

const ICONS: Record<PlatformId, string> = {
  twitter: '𝕏',
  linkedin: 'in',
  instagram: '📷',
  youtube: '▶',
};

interface Props {
  selected: PlatformId[];
  onChange: (platforms: PlatformId[]) => void;
}

export default function PlatformSelector({ selected, onChange }: Props) {
  function toggle(id: PlatformId) {
    if (selected.includes(id)) {
      onChange(selected.filter((p) => p !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div>
      <p className="text-sm font-medium text-gray-300 mb-3">Select platforms</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PLATFORMS.map(({ id, label, charLimit }) => {
          const isSelected = selected.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={clsx(
                'flex flex-col items-start gap-1 p-4 rounded-xl border text-left transition-all',
                isSelected
                  ? 'border-violet-500 bg-violet-500/10 ring-1 ring-violet-500'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              )}
            >
              <span className="text-lg font-bold text-white">{ICONS[id]}</span>
              <span className="text-sm font-medium text-white">{label}</span>
              <span className="text-xs text-gray-500">{charLimit.toLocaleString()} chars</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
