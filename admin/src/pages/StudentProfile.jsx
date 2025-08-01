import React from "react";
import { useParams } from "react-router-dom";
import StudentData from "../assets/utils/StudentData";

const StudentProfile = () => {
  const { id } = useParams(); // expecting /student/:id routing
  const student = StudentData[id];

  if (!student) {
    return <div className="p-6 text-red-500">Student not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex items-center gap-6">
        <img
          src={student.avatar}
          alt={student.fullName}
          className="w-28 h-28 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{student.fullName}</h2>
          <p className="text-gray-500">{student.course} | {student.year}</p>
          <p className="text-gray-500">{student.university}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-gray-700">
        <div>
          <span className="font-semibold">📧 Email:</span>
          <p>{student.email}</p>
        </div>
        <div>
          <span className="font-semibold">📞 Phone:</span>
          <p>{student.phone}</p>
        </div>
        <div>
          <span className="font-semibold">🏳️ Gender:</span>
          <p>{student.gender}</p>
        </div>
        <div>
          <span className="font-semibold">📍 Location:</span>
          <p>{student.location}</p>
        </div>
        <div>
          <span className="font-semibold">📊 Attendance:</span>
          <p>{student.attendance}%</p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Flag Student</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Suspend</button>
      </div>
    </div>
  );
};

export default StudentProfile;
