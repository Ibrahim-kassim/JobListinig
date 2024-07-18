import React, { useState } from "react";
import JobForm from "../components/JobForm";
import AllJobs from "../components/AllJobs";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold mb-8">Welcome to Home Page</h1>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search for jobs"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <button
              onClick={toggleForm}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Add Job
            </button>
          </div>
          {showForm && <JobForm onClose={toggleForm} />}
        </div>

        {/* All Jobs Component */}
        <AllJobs searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Home;
