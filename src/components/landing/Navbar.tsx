import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#03030a]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Repurpose<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">AI</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/pricing" className="text-gray-500 hover:text-white text-sm transition-colors">
            Pricing
          </Link>
          <Link href="/login" className="text-gray-500 hover:text-white text-sm transition-colors">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:-translate-y-px shadow-md shadow-violet-900/30"
          >
            Get Started Free
          </Link>
        </nav>
      </div>
    </header>
  );
}
