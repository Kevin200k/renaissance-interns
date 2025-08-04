import React, { useState } from 'react';
import { Calendar, CheckCircle, SlidersHorizontal, SortAsc, Search, X } from 'lucide-react';

// Dummy data for the attendance history table
const attendanceHistoryData = [
  {
    datePosted: 'Tue May 06 2025',
    title: 'Attendance taken on May 6, 9:36 PM',
    status: 'Attended',
  },
  {
    datePosted: 'Thu May 01 2025',
    title: 'Attendance taken on May 1, 9:40 PM',
    status: 'Attended',
  },
  {
    datePosted: 'Tue Apr 29 2025',
    title: 'Attendance taken on Apr 29, 9:33 PM',
    status: 'Attended',
  },
  {
    datePosted: 'Fri Apr 25 2025',
    title: 'Attendance taken on Apr 24, 9:33 PM',
    status: 'Attended',
  },
  {
    datePosted: 'Thu Apr 17 2025',
    title: 'Attendance taken on Apr 17, 9:45 PM',
    status: 'Attended',
  },
  {
    datePosted: 'Tue Apr 15 2025',
    title: 'Attendance taken on Apr 15, 9:34 PM',
    status: 'Absent',
  },
  {
    datePosted: 'Fri Apr 11 2025',
    title: 'Attendance taken on Apr 10, 9:33 PM',
    status: 'Absent',
  },
  {
    datePosted: 'Tue Apr 08 2025',
    title: 'Attendance taken on Apr 8, 9:32 PM',
    status: 'Attended',
  },
  // Add more dummy data as needed to fill the table
  {
    datePosted: 'Mon Apr 07 2025',
    title: 'Attendance taken on Apr 7, 9:30 PM',
    status: 'Attended',
  },
  {
    datePosted: 'Sun Apr 06 2025',
    title: 'Attendance taken on Apr 6, 9:28 PM',
    status: 'Attended',
  },
];

export default function AttendanceHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortStatus, setSortStatus] = useState("")

  const filteredSubmissions = attendanceHistoryData
    .filter(submission =>
      submission.datePosted.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(submission =>
      sortStatus ? submission.status === sortStatus : true
    );


  return (
    <div className="min-h-screen bg-gray-100 p-6 font-inter">
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Main Content Area for Attendance History */}
      <div className="flex flex-col gap-6">
        {/* Header Section for Attendance History Page */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h1 className="text-3xl font-medium text-gray-800 mb-4 sm:mb-0">
            Attendance History
          </h1>

          <div className="flex items-center gap-4 bg-white rounded-xl shadow-md p-4">
            <div className="flex flex-col items-center text-center">
              <p className="text-sm text-gray-500">Attendance</p>
              <p className="text-lg font-semibold text-gray-800">25 / 27</p>
            </div>
            <button className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div> */}

        {/* Attendance Records Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          {/* Search Bar and Table Title Container */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-semibold text-gray-800 flex-shrink-0">Attendance History</h2>
            <div className="flex-grow flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 shadow-sm bg-white max-w-lg">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by date, title"
                className="flex-grow bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="flex items-center gap-1">
                <SortAsc className="w-4 h-4 text-gray-400" />
                <select
                  value={sortStatus}
                  onChange={(e) => setSortStatus(e.target.value)}
                  className="bg-white text-sm text-gray-700 outline-none border-none"
                >
                  <option value="" >All</option>
                  <option value="Attended">Attended</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date Posted
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                >
                  status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission, index) => (
                <tr key={index} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{submission.datePosted}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{submission.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-sm font-medium ${submission.status === 'Attended' ? 'text-green-600' : 'text-red-600'}`}>
                        {submission.status}
                      </span>
                      {submission.status === 'Attended' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <span className="text-gray-400">---</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No attendance records found for your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
