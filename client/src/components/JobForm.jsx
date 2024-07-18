import React, { useState, useContext } from "react";
import { JobContext } from "../contexts/JobContextPorvider";
import { RiCloseLine } from "react-icons/ri";
import TagInput from "./TagInput"; // Make sure this import points to the correct file

const JobForm = ({ onClose }) => {
  const { createJob } = useContext(JobContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !description || skills.length === 0) {
        setError("All fields are required and at least one skill must be added.");
        return;
      }

      const newJob = {
        title,
        description,
        skills,
      };

      await createJob(newJob);

      setTitle("");
      setDescription("");
      setSkills([]);
      setError("");
      onClose();
    } catch (error) {
      console.error("Error creating job:", error);
      setError("Failed to create job. Please try again later.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full md:w-1/2 relative">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-700"
          onClick={onClose}
        >
          <RiCloseLine className="h-6 w-6" />
        </button>
        <h2 className="text-2xl mb-4">Create a New Job</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Title:</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Description:</label>
            <textarea
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <TagInput tags={skills} setTags={setSkills} />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;