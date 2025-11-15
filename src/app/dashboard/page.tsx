// src/app/dashboard/page.tsx
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { loadSessionData } from '@/lib/dataParser';
import DashboardLayout from '@/components/DashboardLayout';
import fs from 'fs/promises';
import path from 'path';

// Import the new CopyButton Client Component
import CopyButton from '@/components/CopyButton';
import AnalyticsCard from '@/components/AnalyticsCard';

interface User {
  id: string;
  name: string;
  email: string;
  links: string[];
}

interface UsersData {
  users: User[];
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const sessions = await loadSessionData();

  let userLinks: string[] = [];

  try {
    const usersJsonPath = path.join(process.cwd(), 'users.json');
    const usersFileContents = await fs.readFile(usersJsonPath, 'utf-8');
    const usersData: User[] = JSON.parse(usersFileContents); // users.json is an array

    const currentUserName = session.user?.name;

    // Find user by his session name
    const currentUser = usersData.find(
      (user: User) => user.name === currentUserName
    );

    if (currentUser && currentUser.links) {
      userLinks = currentUser.links.slice(0, 4);
    }

  } catch (error) {
    console.error('Error reading or parsing users.json:', error);
  }


  // Placeholder data for analytics cards
  const totalVisits = 0;
  const botSpam = 12;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {session.user?.name}</h1>
            {/* <p className="mt-2 text-sm text-gray-600">
              
            </p> */}
          </div>

{/* New section for Analytics Cards */}
<div className="mb-8">
  <h2 className="sr-only">Analytics Overview</h2> {/* SR-only for accessibility */}
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <AnalyticsCard title="Total Visits" value={totalVisits} />
    <AnalyticsCard title="Bot/Spam" value={botSpam} />
    {/* Add more AnalyticsCard components here if needed */}
  </div>
</div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Refreshed Links
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Always visit your profile for latest and refreshed links weekly
              </p>
            </div>
            <div className="border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {userLinks.length > 0 ? (
                  userLinks.map((linkUrl, index) => {
                    let displayName = linkUrl;
                    try {
                      const urlObject = new URL(linkUrl);
                      displayName = urlObject.hostname.replace('www.', '');
                    } catch (error) {
                      // Fallback if URL is invalid
                    }

                    return (
                      <div key={linkUrl || index} className="border p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                          {/* <h3 className="text-lg font-semibold">{displayName}</h3> */}
                          <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">
                            {linkUrl}
                          </a>
                        </div>
                        {/* Use the CopyButton Client Component here */}
                        <CopyButton textToCopy={linkUrl} />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 col-span-full">No links found in your profile.</p>
                )}
              </div>
            </div>
          </div>
 
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {/* <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Database Contents ({sessions.length})
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                All data from sessions.db
              </p>
            </div> */}
            {/* ... existing SessionCard rendering logic would go here if any ... */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
