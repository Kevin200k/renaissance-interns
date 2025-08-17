// components/Loader.js
import React from 'react';
import logo from "../../../shared/utils/icons/logo.png";


export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      {/* Renaissance Logo */}
      <div className="absolute top-2">
        <img
          src={logo}  // <-- Update path if needed
          alt="Renaissance Logo"
          className="h-12"
        />
      </div>

      {/* Spinner */}
      <div className="spinner">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      {/* Inline Spinner CSS */}
      <style jsx>{`
        .spinner {
          width: 60px;
          height: 60px;
          position: relative;
        }

        .spinner .dot {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
        }

        .spinner .dot::after {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #6ed66e;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .spinner .dot {
          animation: spin 2s infinite;
        }

        .spinner .dot:nth-child(2) {
          animation-delay: 100ms;
        }

        .spinner .dot:nth-child(3) {
          animation-delay: 200ms;
        }

        .spinner .dot:nth-child(4) {
          animation-delay: 300ms;
        }

        .spinner .dot:nth-child(5) {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
}

