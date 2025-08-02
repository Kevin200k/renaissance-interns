import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { students } from '../assets/utils/Students';
import { ArrowLeft } from "lucide-react";

const StudentProfile = () => {
  const { id } = useParams();
  const student = students.find((s) => s.id === Number(id));

  const [presence, setPresence] = useState(student?.presence || "Absent");
  const [isSuspended, setIsSuspended] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  const navigate = useNavigate()

  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-xl">
          <p className="text-2xl font-bold text-red-600">Student Not Found</p>
          <p className="mt-2 text-gray-600">
            The student ID in the URL does not match any record.
          </p>
        </div>
      </div>
    );
  }

  const DetailItem = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-gray-500">{label}</span>
      <p className="mt-1 text-base text-gray-800">{value}</p>
    </div>
  );

  // === Admin Action Handlers ===
  const togglePresence = () => {
    setPresence((prev) => (prev === "Present" ? "Absent" : "Present"));
  };

  // const handleFlag = () => {
  //   setIsFlagged((prev) => !prev);
  //   alert(`Student has been ${!isFlagged ? "flagged" : "unflagged"}.`);
  // };

  // const handleSuspend = () => {
  //   setIsSuspended((prev) => !prev);
  //   alert(`Student has been ${!isSuspended ? "suspended" : "unsuspended"}.`);
  // };

  // const handleSendEmail = () => {
  //   alert(`Email sent to ${student.email}`);
  // };

  return (
    <div className="min-h-screen p-4">

      <button className="mb-4 flex flex-row text-blue-500 hover:text-blue-700 cursor-pointer"
      onClick={() => navigate(-1)}>
        <ArrowLeft />
        Back</button>

      <div className="max-w-2xl p-8 bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center mb-8 pb-8 border-b-2 border-gray-100">
          <div className="relative">
            <img
              src={student.avatar}
              alt={student.fullName}
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-md"
            />
            <span
              className={`absolute bottom-2 right-2 block h-5 w-5 rounded-full ring-2 ring-white ${presence === 'Present' ? 'bg-green-500' : 'bg-gray-500'}`}
              title={presence}
            ></span>
          </div>
          <div className="ml-6">
            <h1 className="text-4xl font-extrabold text-gray-900">{student.fullName}</h1>
            <p className="mt-2 text-lg text-gray-600">
              {student.course} | {student.year}
            </p>
            <p className="text-md text-gray-500">{student.university}</p>
            <p className={`mt-1 font-semibold ${presence === "Present" ? "text-green-600" : "text-red-600"}`}>
              Status: {presence}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-6">
          <DetailItem label="Email" value={student.email} />
          <DetailItem label="Phone" value={student.phone || "N/A"} />
          <DetailItem label="Gender" value={student.gender || "N/A"} />
          <DetailItem label="Current Location" value={student.location || "N/A"} />
          <DetailItem label="Last Check-in" value={student.lastCheckIn || "N/A"} />
          <DetailItem label="Attendance" value={`${student.attendancePercentage || "N/A"}%`} />
        </div>

        {/* Admin Controls */}
        <div className="flex flex-wrap gap-4 border-t-2 pt-6 border-gray-100">
          <button
            onClick={togglePresence}
            className={`${presence === "Present" ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} px-6 py-2 text-white font-semibold rounded-lg shadow-md transition cursor-pointer`}
          >
            Mark as {presence === "Present" ? "Absent" : "Present"}
          </button>

          {/* <button
            onClick={handleFlag}
            className={`px-6 py-2 font-semibold text-white rounded-lg shadow-md transition ${isFlagged ? "bg-yellow-600 hover:bg-yellow-700" : "bg-yellow-500 hover:bg-yellow-600"}`}
          >
            {isFlagged ? "Unflag Student" : "Flag Student"}
          </button>

          <button
            onClick={handleSuspend}
            className={`px-6 py-2 font-semibold text-white rounded-lg shadow-md transition ${isSuspended ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"}`}
          >
            {isSuspended ? "Unsuspend" : "Suspend"}
          </button>

          <button
            onClick={handleSendEmail}
            className="px-6 py-2 font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md transition"
          >
            Send Email
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
