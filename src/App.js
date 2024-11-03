// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import { generateJobMatch } from './openaiService';
import './styles.css';

function App() {
    const [jobs, setJobs] = useState([
        { title: "Software Developer", company: "Tech Solutions Inc.", location: "Remote", description: "Develop software solutions." },
        { title: "Retail Associate", company: "Main Street Shop", location: "Downtown Geneseo", description: "Assist customers and manage inventory." },
        { title: "Farm Hand", company: "Green Acres Farm", location: "Rural Geneseo", description: "Perform tasks on a farm." },
    ]);
    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const [userProfile, setUserProfile] = useState("");

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

    const handleProfileChange = (e) => {
        setUserProfile(e.target.value);
    };

    const handleJobMatch = async () => {
        if (!userProfile) {
            alert("Please enter your profile information first.");
            return;
        }

        const matches = await Promise.all(
            jobs.map(async (job) => {
                const matchResult = await generateJobMatch(job.description, userProfile);
                return { ...job, matchResult };
            })
        );

        setFilteredJobs(matches);
    };

    return (
        <div className="App">
            <Navbar onSearch={handleSearch} />
            <div className="profile-section">
                <h2>Your Profile</h2>
                <textarea
                    placeholder="Describe your skills, experience, and job preferences..."
                    value={userProfile}
                    onChange={handleProfileChange}
                />
                <button onClick={handleJobMatch}>Find Best Matches</button>
            </div>
            <JobList jobs={filteredJobs} />
            <h2>Post a New Job</h2>
            <JobForm onPostJob={handlePostJob} />
        </div>
    );
}

export default App;
