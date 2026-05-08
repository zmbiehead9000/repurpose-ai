import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
      {/* Background glow + grid */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 grid-texture pointer-events-none opacity-60" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-56 h-56 bg-fuchsia-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></span>
          AI-Powered Content Repurposing
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight max-w-4xl mx-auto">
          Turn One Post Into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400">
            A Week of Content
          </span>
        </h1>

        <p className="mt-7 text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
          Paste your blog post, YouTube transcript, or podcast notes. Get polished posts
          for Twitter, LinkedIn, Instagram, and YouTube — in seconds.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="group relative bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-violet-900/40 hover:shadow-violet-800/50 hover:-translate-y-0.5"
          >
            Start for Free — No Card Required
          </Link>
          <Link
            href="/pricing"
            className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1"
          >
            See pricing <span className="text-violet-400">→</span>
          </Link>
        </div>

        <p className="mt-4 text-xs text-gray-600">
          5 free generations/month · No credit card required
        </p>

        {/* Social proof strip */}
        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="text-yellow-400">★★★★★</span>
            <span>Loved by creators</span>
          </span>
          <span className="w-px h-4 bg-gray-800" />
          <span>4 platforms in one click</span>
          <span className="w-px h-4 bg-gray-800" />
          <span>~5 second generation</span>
        </div>

        {/* App mockup */}
        <div className="mt-16 max-w-3xl mx-auto card-glow bg-gray-900/80 backdrop-blur-sm border border-gray-800/80 rounded-2xl overflow-hidden text-left">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-800/80 bg-gray-900/60">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            <span className="ml-3 text-xs text-gray-600 font-mono">repurposeai.com/dashboard</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-gray-800/70 rounded-xl p-4 border border-gray-700/50">
              <p className="text-xs text-gray-500 mb-2 font-medium">Your content</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                &ldquo;Today I want to share 5 lessons I learned building my first SaaS product from scratch with zero funding. After 18 months of late nights and weekends…&rdquo;
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: '𝕏', label: 'Twitter' },
                { icon: 'in', label: 'LinkedIn' },
                { icon: '📷', label: 'Instagram' },
                { icon: '▶', label: 'YouTube' },
              ].map((p) => (
                <div key={p.label} className="bg-violet-500/15 border border-violet-500/35 text-violet-300 text-xs font-medium px-3 py-2 rounded-lg text-center flex flex-col items-center gap-1">
                  <span className="text-base">{p.icon}</span>
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-36 bg-gradient-to-r from-violet-600 to-violet-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold shadow-lg shadow-violet-900/40">
                Generate 4 Posts
              </div>
              <span className="text-gray-600 text-xs">← takes ~5 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
