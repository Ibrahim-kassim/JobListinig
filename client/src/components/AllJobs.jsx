import React, { useContext, useEffect, useState } from "react";
import { JobContext } from "../contexts/JobContextPorvider";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';

const AllJobs = ({ searchTerm }) => {
  const { jobs, getJobs, deleteJob, updateJob } = useContext(JobContext);
  const [editMode, setEditMode] = useState(null);
  const [editedJob, setEditedJob] = useState({
    title: "",
    description: "",
    skills: [],
  });

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id);
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  const handleEdit = (job) => {
    setEditMode(job._id);
    setEditedJob({ ...job });
  };

  const handleSave = async () => {
    try {
      await updateJob(editedJob._id, editedJob);
      setEditMode(null);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedJob({ title: "", description: "", skills: [] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob({ ...editedJob, [name]: value });
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Available Jobs</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <div key={job._id} className="bg-white overflow-hidden shadow-lg rounded-lg">
            {editMode === job._id ? (
              <div className="p-6">
                <input
                  type="text"
                  name="title"
                  value={editedJob.title}
                  onChange={handleChange}
                  className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Job Title"
                />
                <textarea
                  name="description"
                  value={editedJob.description}
                  onChange={handleChange}
                  className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Job Description"
                  rows="3"
                />
                <input
                  type="text"
                  name="skills"
                  value={editedJob.skills.join(", ")}
                  onChange={handleChange}
                  className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Skills (comma-separated)"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="p-6">
                  <Link to={`/job/${job._id}`} className="block mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition duration-150 ease-in-out">{job.title}</h3>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                  <Link to={`/job/${job._id}`} className="text-blue-600 hover:text-blue-800 flex items-center">
                    View Details <FaExternalLinkAlt className="ml-1" />
                  </Link>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-2 text-green-600 hover:text-green-800 focus:outline-none"
                      aria-label="Edit"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                      aria-label="Delete"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;