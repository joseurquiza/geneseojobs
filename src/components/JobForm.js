// src/components/JobForm.js
import React, { useState } from 'react';

function JobForm({ onPostJob }) {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onPostJob({ title, company, location });
        setTitle('');
        setCompany('');
        setLocation('');
    };

    return (
        <form className="job-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />
            <button type="submit">Post Job</button>
        </form>
    );
}

export default JobForm;
