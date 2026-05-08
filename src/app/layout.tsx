import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'RepurposeAI — Turn One Post Into a Week of Content',
  description:
    'Paste your blog post, transcript, or podcast notes. Get polished Twitter, LinkedIn, Instagram, and YouTube posts instantly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} antialiased bg-gray-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
