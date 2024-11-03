// src/App.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import { API, graphqlOperation } from 'aws-amplify';
import { listJobs } from './graphql/queries';
import { createJob } from './graphql/mutations';
import './styles.css';

function App() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const jobData = await API.graphql(graphqlOperation(listJobs));
            const jobList = jobData.data.listJobs.items;
            setJobs(jobList);
            setFilteredJobs(jobList);
        } catch (error) {
            console.error("Error fetching jobs", error);
        }
    };

    const handlePostJob = async (newJob) => {
        try {
            const jobInput = {
                title: newJob.title,
                company: newJob.company,
                location: newJob.location,
                description: newJob.description,
                postedDate: new Date().toISOString(),
            };
            await API.graphql(graphqlOperation(createJob, { input: jobInput }));
            fetchJobs(); // Refresh the job list
        } catch (error) {
            console.error("Error posting job", error);
        }
    };

    const handleSearch = (searchTerm) => {
        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobs(filtered);
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
