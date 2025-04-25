"useclient";
// components/SubmissionForm.jsx
// import React, { useState } from "react";

const SubmissionForm = () => {
  //   const [timeSpent, setTimeSpent] = useState("");
  //   const [tries, setTries] = useState("");
  //   const [language, setLanguage] = useState("");
  //   const [code, setCode] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Add Submission
      </h2>
      <p className="text-gray-600 mb-6">
        Problems • <span className="text-blue-600">E - Kidus and Robot</span>
      </p>

      <form>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="timeSpent">
              Time Spent
            </label>
            <input
              type="text"
              id="timeSpent"
              //   value={timeSpent}
              //   onChange={(e) => setTimeSpent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Time Spent"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="tries">
              Tries
            </label>
            <input
              type="text"
              id="tries"
              //   value={tries}
              //   onChange={(e) => setTries(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tries"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="language">
            Select Language
          </label>
          <select
            id="language"
            // value={language}
            // onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              >
                <span className="text-green-500 underline">Edit</span>
              </button>
            </div>
            <button
              type="button"
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              &lt;/&gt; Preview
            </button>
          </div>
          <textarea
            // value={code}
            // onChange={(e) => setCode(e.target.value)}
            className="w-full h-48 p-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Code"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;
