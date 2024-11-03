// src/components/Navbar.js
import React, { useState } from 'react';

function Navbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <nav className="navbar">
            <h1>Geneseo Jobs</h1>
            <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </nav>
    );
}

export default Navbar;
