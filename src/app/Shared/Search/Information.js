import React from "react";

const Information = ({ deliveryCloseModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 overflow-auto p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl dark:bg-gray-900 p-8">
        {/* Content */}
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              How to search using this format:
            </p>
            <button
              onClick={deliveryCloseModal}
              className="text-gray-500 hover:text-red-600 transition-colors duration-200 focus:outline-none"
              aria-label="Close modal"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-base">
            Use{" "}
            <code className="font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md">
              *
            </code>{" "}
            to represent the gaps where you want any number to appear. For
            example, if you type{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-lg select-all">
              *999**2*46
            </code>
            , it means:
          </p>
          <ul className="list-disc list-inside ml-6 text-gray-800 dark:text-gray-200">
            <li>
              <code className="font-mono bg-indigo-200 text-indigo-900 px-1 rounded">
                *
              </code>{" "}
              Start with any digit
            </li>
            <li>
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                999
              </span>{" "}
              exactly
            </li>
            <li>
              <code className="font-mono bg-indigo-200 text-indigo-900 px-1 rounded">
                **
              </code>{" "}
              Two digits of any value
            </li>
            <li>
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                2
              </span>{" "}
              exactly
            </li>
            <li>
              <code className="font-mono bg-indigo-200 text-indigo-900 px-1 rounded">
                *
              </code>{" "}
              Any digit
            </li>
            <li>
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                46
              </span>{" "}
              exactly
            </li>
          </ul>
          <p>
            This helps you find numbers that match this pattern with specific
            digits in the exact places you want.
          </p>
          <p className="italic text-sm text-indigo-500 dark:text-indigo-400">
            Try typing your pattern using <code className="font-mono">*</code>{" "}
            for gaps to get precise search results!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Information;
