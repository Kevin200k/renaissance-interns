// src/components/SignupForm.jsx
import { useState } from "react";
import { signup, loginWithGoogle } from "../firebase/auth";
import { BsGoogle, BsFacebook } from 'react-icons/bs';


export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      // Optionally redirect to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      // Optionally redirect
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="bg-red-300 p-8 rounded shadow-md w-full">
      {/* <h2 className="text-2xl mb-4 font-semibold text-center">Sign Up</h2> */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
        type="button"
        onClick={handleGoogleSignup}
        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google logo"
          className="w-5 h-5 mr-2"
        />
        Sign up with Google
      </button>
      <div>or</div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded mb-3"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        required
      />
      <button type="submit" className="bg-[#04b402] text-white w-full py-2 rounded mb-3">
        Sign Up
      </button>
    </form>
  );
}
