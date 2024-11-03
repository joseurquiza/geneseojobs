// src/components/JobCard.js
import React from 'react';

function JobCard({ job }) {
    return (
        <div className="job-card">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <button>Apply Now</button>
        </div>
    );
}

export default JobCard;
