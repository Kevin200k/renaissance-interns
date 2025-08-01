import React, { useState } from 'react'
import { students } from '../assets/utils/Students'
import { NavLink } from 'react-router-dom'
import { Ellipsis, ArrowRight } from 'lucide-react'

const StudentManagement = () => {
  const [showAllCards, setShowAllCards] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStudents = students
    .filter((student) =>
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, showAllCards ? students.length : 8)

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index))
  }

  return (
    <section className="min-h-screen px-6 py-8 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-700">Student Management</h1>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-300">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students..."
              className="outline-none bg-transparent w-40 text-sm text-gray-700 placeholder-gray-400"
            />
            <ArrowRight strokeWidth={1.5} size={18} className="text-gray-500" />
          </div>

          {/* Filter */}
          <select className="px-3 py-1.5 rounded-md border border-gray-300 bg-white shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-500">
            <option value="">All</option>
            <option value="high">Above 80% Attendance</option>
            <option value="medium">50% - 80% Attendance</option>
            <option value="low">Below 50% Attendance</option>
          </select>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-sm">
            Student Not Found
          </div>
        ) : (
          filteredStudents.map((student, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-200 p-4 flex flex-col gap-4 relative"
            >
              {/* Action Button */}
              <div
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-full cursor-pointer"
                onClick={() => toggleDropdown(index)}
              >
                <Ellipsis size={18} />
              </div>

              {/* Dropdown */}
              {activeDropdown === index && (
                <NavLink to={ `/student-management/${student.id}` } className="absolute top-12 right-3 z-10 bg-white border border-gray-200 shadow-md rounded-lg text-sm w-40">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">View Profile</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Flag Student</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Suspend</button>
                </NavLink>
              )}

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-gray-100 ">
                <img src={student.avatar} alt={student.fullName} className="w-full h-full object-cover relative " />

                <span
                  className={`absolute top-20 right-24 h-4 w-4 rounded-full z-50 ring-2 ring-white shadow-md 
                    ${student.presence === 'Present' ? 'bg-green-500' : 'bg-gray-500'}`}
                  title={student.presence}
                ></span>


              </div>

              {/* Info */}
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">{student.fullName}</h2>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>

              <div className="text-center text-sm text-gray-600">
                <span className="font-medium">Last Check-in:</span> {student.lastCheckIn || 'N/A'}
              </div>

              <div className="text-center">
                <span className="text-sm font-semibold text-gray-700">
                  Attendance: {student.attendancePercentage ?? student.attendance ?? 0}%
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* See All Toggle */}
      {students.length > 8 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAllCards(!showAllCards)}
            className="text-blue-500 hover:underline hover:text-blue-700 text-sm font-medium"
          >
            {showAllCards ? 'See less' : 'See all'}
          </button>
        </div>
      )}
    </section>
  )
}

export default StudentManagement
