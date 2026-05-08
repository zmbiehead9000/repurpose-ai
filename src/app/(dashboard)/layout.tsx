import type { ReactNode } from 'react';
import DashboardNav from '@/components/dashboard/DashboardNav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      <DashboardNav />
      <main className="flex-1 ml-56 p-8">{children}</main>
    </div>
  );
}
