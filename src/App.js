// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import './styles.css';

function App() {
    const [jobs, setJobs] = useState([
        { title: "Software Developer", company: "Tech Solutions Inc.", location: "Remote" },
        { title: "Retail Associate", company: "Main Street Shop", location: "Downtown Geneseo" },
        { title: "Farm Hand", company: "Green Acres Farm", location: "Rural Geneseo" },
    ]);
    const [filteredJobs, setFilteredJobs] = useState(jobs);

    const handleSearch = (searchTerm) => {
        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobs(filtered);
    };

    const handlePostJob = (newJob) => {
        setJobs([...jobs, newJob]);
        setFilteredJobs([...jobs, newJob]);
    };

    return (
        <div className="App">
            <Navbar onSearch={handleSearch} />
            <JobList jobs={filteredJobs} />
            <h2>Post a New Job</h2>
            <JobForm onPostJob={handlePostJob} />
        </div>
    );
}

export default App;
