// components/Overlay.tsx
import React from "react";

const Overlay: React.FC = ({ onClose }) => {
  return (
    // Outer div for the full-screen overlay
    <div
      className="fixed inset-0 bg-black/20 flex mb:items-center-safe items-center justify-center z-50 w-full"
      onClick={onClose}
    >
      <div className="relative bg-white mb:mt-20 mt-10 py-4 px-2 mx-4  lg:mb-32 rounded-xl shadow-2xl text-center max-w-md w-full text-gray-800">
        <button
          onClick={onClose}
          className="absolute mb:top-3 mb:right-3 top-0.5 right-2 text-2xl text-gray-500 hover:text-gray-900 font-semibold"
          aria-label="Close overlay"
        >
          &times;
        </button>
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 leading-tight">
          Welcome to <br />
          <span className="text-indigo-600">Private Feedback</span>
        </h2>
        <p className="text-lg sm:text-xl mb-6 text-gray-700">
          A fullstack Next.js application for anonymous responses.
        </p>
        <p className="text-base sm:text-lg mb-4 text-gray-600">
          Sign up and share your public link to receive anonymous feedback or
          answers to a question.
        </p>
        <p className="text-base sm:text-lg mb-4 text-gray-600">
          You can stop accepting responses anytime — total control, simple
          setup.
        </p>
        <div className="text-left space-y-3 text-sm sm:text-base bg-gray-50 p-4 rounded mt-6">
          <p>
            <span className="font-semibold text-gray-800">Sign Up:</span> Use
            code{" "}
            <code className="font-bold bg-red-100 px-2 py-1 rounded">
              296077
            </code>{" "}
            for verification
          </p>
          <div className="text-center text-gray-500 font-medium">— or —</div>
          <p>
            <span className="font-semibold text-gray-800">Login:</span>
            <br />
            Username:{" "}
            <code className="font-bold text-green-700 bg-green-100 px-2 py-1 rounded">
              test@email.com
            </code>
            <br />
            Password:{" "}
            <code className="font-bold text-green-700 bg-green-100 px-2 py-1 rounded">
              123456
            </code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
