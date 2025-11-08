import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { loadSessionData } from '@/lib/dataParser';
import SessionCard from '@/components/SessionCard';
import DashboardLayout from '@/components/DashboardLayout';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const sessions = await loadSessionData();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back, {session.user?.name}
            </p>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Database Contents ({sessions.length})
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                All data from sessions.db
              </p>
            </div>

            <ul className="divide-y divide-gray-200">
              {sessions.map((item, index) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {item.key}
                      </p>
                      <p className="text-sm text-gray-500">
                        {typeof item.value === 'object' ? JSON.stringify(item.value, null, 2) : item.value}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
