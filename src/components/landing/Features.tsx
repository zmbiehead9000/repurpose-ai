const features = [
  {
    icon: '📋',
    title: 'Paste Any Content',
    description: 'Blog posts, YouTube transcripts, podcast show notes, newsletters — anything up to 8,000 characters.',
    highlight: 'Works with any format',
  },
  {
    icon: '🎯',
    title: 'Choose Your Platforms',
    description: 'Twitter/X threads, LinkedIn posts, Instagram captions, YouTube descriptions. Pick one or all four.',
    highlight: '4 platforms at once',
  },
  {
    icon: '⚡',
    title: 'Copy & Post in Seconds',
    description: 'AI writes optimized copy for each platform\'s tone and format. One click to copy, then paste and publish.',
    highlight: '~5 second turnaround',
  },
];

const stats = [
  { value: '4', label: 'Platforms supported' },
  { value: '5s', label: 'Average generation time' },
  { value: '8k', label: 'Max character input' },
  { value: '$0', label: 'To get started' },
];

export default function Features() {
  return (
    <section className="py-24 px-6 relative">
      {/* Subtle section divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-px bg-gray-800/60 rounded-2xl overflow-hidden mb-20 border border-gray-800/60">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-gray-950 px-6 py-5 text-center">
              <p className="text-2xl font-extrabold text-white mb-1">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4 tracking-tight">
          How it works
        </h2>
        <p className="text-gray-500 text-center text-sm mb-14 max-w-md mx-auto">
          Stop spending hours reformatting the same content. Let AI do it in seconds.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon, title, description, highlight }, i) => (
            <div
              key={title}
              className="group relative bg-gray-900/60 border border-gray-800/80 rounded-2xl p-7 hover:border-violet-500/30 transition-all duration-300 hover:card-glow"
            >
              {/* Step number */}
              <div className="absolute top-5 right-5 text-xs font-bold text-gray-700">0{i + 1}</div>

              <div className="text-3xl mb-5">{icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
              <span className="inline-block text-xs bg-violet-500/10 border border-violet-500/20 text-violet-400 px-2.5 py-1 rounded-full font-medium">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
