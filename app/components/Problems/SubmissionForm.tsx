"use client";

import React, { FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "@/redux/store";
import {
  setTimeSpent,
  setTries,
  setLanguage,
  setCode,
  submitProblem,
  resetSubmission,
} from "@/redux/slices/submissionSlice";
import { fetchProblemById } from "@/redux/slices/problemsSlice";

const SubmissionForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const problemId = searchParams.get("id");
  const { timeSpent, tries, language, code, status, error, submissionResult } =
    useSelector((state: RootState) => state.submission);
  const { problem } = useSelector((state: RootState) => state.problems);

  useEffect(() => {
    if (problemId) {
      dispatch(fetchProblemById(problemId));
    }
  }, [dispatch, problemId]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (problemId) {
      dispatch(
        submitProblem({
          timeSpent: Number(timeSpent),
          tries: Number(tries),
          language,
          code,
          problemId: Number(problemId),
        })
      );
    }
  };

  console.log("submissionResult", submissionResult);

  // Update to check for the success message before redirecting
  useEffect(() => {
    if (status === "succeeded") {
      router.push(
        `/dashboard/problems/problemsubmission?id=${problemId?.toString()}`
      );
    }
  }, [status, submissionResult, router, problemId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Add Submission
      </h2>
      <p className="text-gray-600 mb-6">
        Problems •{" "}
        <span className="text-blue-600">{problem?.name || "Unknown"}</span>
      </p>

      {status === "succeeded" && submissionResult && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
          Submission successful! Redirecting...
        </div>
      )}
      {status === "failed" && error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="timeSpent">
              Time Spent
            </label>
            <input
              type="text"
              id="timeSpent"
              value={timeSpent}
              onChange={(e) => dispatch(setTimeSpent(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Time Spent"
              disabled={status === "loading"}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="tries">
              Tries
            </label>
            <input
              type="text"
              id="tries"
              value={tries}
              onChange={(e) => dispatch(setTries(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tries"
              disabled={status === "loading"}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="language">
            Select Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => dispatch(setLanguage(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === "loading"}
          >
            <option value="" disabled>
              Select Language
            </option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center border border-gray-300 rounded-t-md p-2 bg-gray-50">
            <div className="flex space-x-2">
              <button
                type="button"
                className="text-gray-600 hover:text-blue-600 focus:outline-none"
                disabled={status === "loading"}
              >
                <span className="text-green-500 underline">Edit</span>
              </button>
            </div>
            <button
              type="button"
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
              disabled={status === "loading"}
            >
              Preview
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => dispatch(setCode(e.target.value))}
            className="w-full h-48 p-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Code"
            disabled={status === "loading"}
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmissionForm;
