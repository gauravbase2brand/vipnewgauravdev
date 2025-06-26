"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
const Feedback = ({ userProfile, page, setOpenFeed }) => {
  const { starRating, setStarRating } = useContext(AppStateContext);
  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      toast.warn("Please enter feedback before submitting.");
      return;
    }

    const payload = {
      name: userProfile?.firstname, // Replace with dynamic name if available
      email: userProfile?.email, // Replace with userProfile.email if needed
      mobile: userProfile?.mobile, // Replace with userProfile.mobile if needed
      feedback: feedbackText,
      rating: `I give you ${starRating} star.`,
      coming: `${page} Page Feedback - ${userProfile?.mobile}`,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/web/feedback`, payload);
      toast.success("Thanks for your feedback!");
      setFeedbackText(""); // Clear textarea
    } catch (error) {
      console.error("Error submitting feedback", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-70 overflow-auto p-6">
      <div className="max-w-md py-3 px-3 sm:mx-auto">
        <div className="flex flex-col rounded-xl bg-slate-200 shadow-lg border border-gray-500">
          <div className="px-12 py-5 flex items-center relative">
            <h2 className="whitespace-nowrap text-center font-semibold text-gray-800 sm:text-xl">
              Your opinion matters to us!
            </h2>
            <button
              onClick={() => {
                setOpenFeed(false);
                setStarRating(0);
              }}
              className="text-gray-500 hover:text-red-600 transition-colors duration-200 focus:outline-none absolute top-1 right-0"
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
          <div className="flex w-full flex-col items-center bg-[#fdfeff]">
            <div className="flex flex-col items-center space-y-3 py-6">
              <span className="text-lg font-medium text-gray-500">
                How was your experience?
              </span>
              <div className="flex space-x-3">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    onClick={() => setStarRating(index + 1)}
                    className={`h-8 w-8 cursor-pointer ${
                      index < starRating ? "text-secondary" : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex w-3/4 flex-col">
              <textarea
                rows="3"
                className="resize-none rounded-xl bg-gray-100 p-4 text-gray-500 outline-none focus:ring border border-gray-500"
                placeholder="Leave a message, if you want"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              ></textarea>
              <button
                className="my-8 rounded-xl bg-primary py-3 text-base text-white disabled:opacity-50"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Rate now"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center py-5">
            <a href="/" className="text-sm text-gray-600">
              Maybe later
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
