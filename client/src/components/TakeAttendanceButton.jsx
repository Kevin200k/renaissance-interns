import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const TakeAttendanceButton = () => {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [signedInToday, setSignedInToday] = useState(false);

  const userId = 'qfC1YW5WntQ6XlCDrhwWhVEziHu2'; // Hardcoded User ID for testing

  const handleAttendance = async () => {
    setLoading(true);
    setStatusMessage('Marking attendance...');

    try {
      const response = await axiosInstance.post('/attendance/mark', {
        userId: userId
      });

      setStatusMessage(response.data.message || 'Attendance marked successfully.');
      if (response.data.lastSignedInDate === new Date().toISOString().split("T")[0]) {
        setSignedInToday(true);
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.error || 'Failed to mark attendance.';
      setStatusMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {signedInToday ? (
        <p className="text-green-600 font-bold">✅ You are marked present for today</p>
      ) : (
        <button
          onClick={handleAttendance}
          disabled={loading}
          className="px-6 py-3 text-[16px] bg-black font-normal text-white rounded-3xl"
        >
          {loading ? 'Marking Attendance...' : 'Take Attendance'}
        </button>
      )}
      {statusMessage && <p className="mt-2 text-sm">{statusMessage}</p>}
    </div>
  );
}; 

export default TakeAttendanceButton;
 