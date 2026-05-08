import UsageMeter from '@/components/dashboard/UsageMeter';
import ContentForm from '@/components/dashboard/ContentForm';

export default function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Repurpose Content</h1>
        <p className="text-gray-400 text-sm mt-1">
          Paste your content, pick platforms, and get ready-to-post social media copy.
        </p>
      </div>

      <UsageMeter />
      <ContentForm />
    </div>
  );
}
