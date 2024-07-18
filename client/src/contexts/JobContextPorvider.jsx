import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const JobContext = createContext({});

const JobContextProvider = (props) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Function to create a new job listing
  const createJob = async (newJob) => {
    try {
      const response = await axios.post("http://localhost:3001/api/jobs", newJob);
      setJobs([...jobs, response.data]); 
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  // Function to update an existing job listing
  const updateJob = async (id, updatedJob) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/jobs/${id}`, updatedJob);
      const updatedJobs = jobs.map((job) =>
        job._id === id ? response.data : job
      );
      setJobs(updatedJobs);
    } catch (error) {
      console.error(`Error updating job ${id}:`, error);
    }
  };

  // Function to delete a job listing
  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/jobs/${id}`);
      const updatedJobs = jobs.filter((job) => job._id !== id);
      setJobs(updatedJobs);
    } catch (error) {
      console.error(`Error deleting job ${id}:`, error);
    }
  };

  const contextValues = {
    jobs,
    createJob,
    updateJob,
    deleteJob,
    getJobs: fetchJobs, // Assigning fetchJobs to getJobs
  };

  return (
    <JobContext.Provider value={contextValues}>
      {props.children}
    </JobContext.Provider>
  );
};

export default JobContextProvider;
