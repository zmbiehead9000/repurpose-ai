import Navbar from '@/components/landing/Navbar';
import PricingCards from '@/components/landing/PricingCards';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <Navbar />
      <div className="pt-24">
        <PricingCards />
      </div>

      <div className="text-center pb-20 px-6">
        <p className="text-gray-500 text-sm">
          Questions?{' '}
          <a href="mailto:hello@repurposeai.com" className="text-violet-400 hover:text-violet-300">
            Contact us
          </a>
        </p>
      </div>

      <footer className="border-t border-gray-800 py-10 px-6 text-center">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} RepurposeAI ·{' '}
          <Link href="/" className="hover:text-gray-400 transition-colors">Home</Link>
          {' · '}
          <Link href="/login" className="hover:text-gray-400 transition-colors">Sign In</Link>
        </p>
      </footer>
    </div>
  );
}
