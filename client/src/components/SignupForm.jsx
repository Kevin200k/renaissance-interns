import { useState } from "react";
import { signup, loginWithGoogle } from "../../../shared/firebase/auth";
import { Mail, Lock } from "lucide-react"; // <-- import icons

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
    <form onSubmit={handleSignup} className="p-8 w-[70%] ">
      <div>
        <h1 className="text-4xl font-medium ">Welcome Interns</h1>
        <p className="text-md font-normal">Please sign up to take attendance</p>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="button"
        onClick={handleGoogleSignup}
        className="flex items-center justify-center my-5 px-4 py-2 w-full border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google logo"
          className="w-5 h-5 mr-2"
        />
        Sign up with Google
      </button>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Email Input with Icon */}
      <div className="relative mb-4">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-b-2 border-gray-200 p-2 pl-10"
          required
        />
      </div>

      {/* Password Input with Icon */}
      <div className="relative mb-4">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border-b-2 border-gray-200 p-2 pl-10"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-[#10b981] text-white w-full py-2 rounded mb-3"
      >
        Sign Up
      </button>
    </form>
  );
}
