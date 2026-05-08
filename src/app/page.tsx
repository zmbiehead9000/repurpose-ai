import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import PricingCards from '@/components/landing/PricingCards';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-[#03030a] min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <PricingCards />

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to stop wasting time?
          </h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            Join creators who are publishing more content in less time.
            Start free — no credit card needed.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-semibold px-10 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-violet-900/40 text-sm"
          >
            Get Started Free Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-lg font-bold text-white">
            Repurpose<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">AI</span>
          </span>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/pricing" className="hover:text-gray-400 transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-gray-400 transition-colors">Sign In</Link>
            <Link href="/signup" className="hover:text-gray-400 transition-colors">Sign Up</Link>
          </div>
          <p className="text-gray-700 text-sm">© {new Date().getFullYear()} RepurposeAI</p>
        </div>
      </footer>
    </div>
  );
}
