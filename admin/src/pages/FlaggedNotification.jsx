import React from 'react';
import { Bell, CheckCircle, XCircle } from 'lucide-react';

const flaggedData = [
  {
    id: 1,
    name: 'John Doe',
    userId: 'EMP001',
    date: '2025-07-31 08:45 AM',
    issue: 'Outside allowed location (3.1km away)',
    status: 'Unreviewed',
  },
  {
    id: 2,
    name: 'Jane Smith',
    userId: 'EMP002',
    date: '2025-07-31 09:12 AM',
    issue: 'Checked in during off-hours',
    status: 'Unreviewed',
  },
  {
    id: 3,
    name: 'Michael Brown',
    userId: 'EMP003',
    date: '2025-07-30 07:58 AM',
    issue: 'Location access denied (GPS blocked)',
    status: 'Reviewed',
  },
];

const FlaggedNotifications = () => {
  return (
    <div className="min-h-screen px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <Bell className="text-red-500" /> Flagged Notifications
        </h1>
        <p className="text-gray-600 text-sm mt-1">Review suspicious or unusual check-in attempts</p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flaggedData.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{record.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.date}</td>
                <td className="px-6 py-4 whitespace-pre-line text-sm text-red-600">{record.issue}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${record.status === 'Reviewed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" /> Mark Reviewed
                  </button>
                  <button className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600">
                    <XCircle className="w-4 h-4 mr-1" /> Ignore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlaggedNotifications;
