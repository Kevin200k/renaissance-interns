import React from "react";
import { useParams } from "react-router-dom";
import { students } from '../assets/utils/Students'

const StudentProfile = () => {
  const { id } = useParams(); // expecting /studentId/:id routing
 const studentId = students.find((s) => s.id === Number(id));

  if (!studentId) {
    return <div className="p-6 text-red-500">Student not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex items-center gap-6">
        <img
          src={studentId.avatar}
          alt={studentId.fullName}
          className="w-28 h-28 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{studentId.fullName}</h2>
          <p className="text-gray-500">{studentId.course} | {studentId.year}</p>
          <p className="text-gray-500">{studentId.university}</p>
          <p className={`${studentId.presence === 'Present' ? 'text-green-500' : 'text-red-500'} py-1 rounded w-fit text-sm font-semibold`}>
            {studentId.presence}
          </p>

        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-gray-700">
        <div>
          <span className="font-semibold">📧 Email:</span>
          <p>{studentId.email}</p>
        </div>
        <div>
          <span className="font-semibold">📞 Phone:</span>
          <p>{studentId.phone}</p>
        </div>
        <div>
          <span className="font-semibold">🏳️ Gender:</span>
          <p>{studentId.gender}</p>
        </div>
        <div>
          <span className="font-semibold">📍 Current  Location:</span>
          <p>{studentId.location}</p>
        </div>
        <div>
          <span className="font-semibold">📊 Attendance:</span>
          <p>{studentId.attendance}%</p>
        </div>
      </div>

      <div className="mt-8 flex">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Flag Student</button>
      </div>
    </div>
  );
};

export default StudentProfile;
