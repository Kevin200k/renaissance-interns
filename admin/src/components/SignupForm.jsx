import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { signup, loginWithGoogle } from '../firebase/auth';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { getIdToken } from 'firebase/auth';

const SignupForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await signup(userEmail, password);

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'admin',
        createdAt: new Date(),
        status: 'active'
      });

      const token = await getIdToken(user);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        role: 'admin'
      }));

      alert('Admin Signup Successful!');
      navigate('/admin-dashboard');
    } catch (err) {
      console.error('Signup Error:', err);
      setError(err.message || 'Failed to signup.');
    }

    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');

    try {
      const user = await loginWithGoogle();

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'admin',
        createdAt: new Date(),
        status: 'active'
      }, { merge: true });

      const token = await getIdToken(user);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        role: 'admin'
      }));

      alert('Admin Signup Successful with Google!');
      navigate('/admin-dashboard');
    } catch (err) {
      console.error('Google Signup Error:', err);
      setError(err.message || 'Failed to signup with Google.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-md">
        <h2 className="text-3xl font-bold text-center text-blue-700">Welcome Admins</h2>
        <p className='mb-6 text-center'>Please Sign up to Monitor Attendance</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum of 6 characters"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium shadow-md transition"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition"
            onClick={handleGoogleSignUp}
          >
            <FcGoogle className="text-2xl" />
            <span className="text-sm font-medium text-gray-700">Continue with Google</span>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <a href="#" className="text-blue-600 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
