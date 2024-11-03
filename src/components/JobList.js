// src/components/JobList.js
import React from 'react';
import JobCard from './JobCard';

function JobList({ jobs }) {
    return (
        <div className="job-list">
            {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
            ))}
        </div>
    );
}

export default JobList;
