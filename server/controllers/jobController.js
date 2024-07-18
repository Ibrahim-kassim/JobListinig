const Job = require('../models/Job');


exports.createJob = async (req, res) => {
    const { title, description, skills } = req.body;
    // const attachment = req.files.map(file => file.path);

    try {
        const skillsArray = typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : skills;

        const newJob = new Job({ title, description, skills: skillsArray});
        await newJob.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateJob = async (req, res) => {
    const { title, description, skills } = req.body;

    try {
        const job = await Job.findByIdAndUpdate(req.params.id, { title, description, skills }, { new: true });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
