import { SessionData } from '@/lib/dataParser';

interface SessionCardProps {
  session: SessionData;
}

export default function SessionCard({ session }: SessionCardProps) {
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <li className="px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-600 truncate">
              Session ID: {session.id}
            </p>
            <div className="ml-2 flex-shrink-0 flex">
              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                session.tag === 'live' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {session.tag}
              </p>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Landing URL:</span>
              </p>
              <p className="text-xs text-gray-400 truncate">
                {session.landing_url}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                <span className="font-medium">IP Address:</span> {session.remote_addr}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Created:</span> {formatTimestamp(session.create_time)}
              </p>
            </div>
          </div>
          {session.uid && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                <span className="font-medium">UID:</span> {session.uid}
              </p>
            </div>
          )}
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              <span className="font-medium">User Agent:</span>
            </p>
            <p className="text-xs text-gray-400 truncate">
              {session.useragent}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
