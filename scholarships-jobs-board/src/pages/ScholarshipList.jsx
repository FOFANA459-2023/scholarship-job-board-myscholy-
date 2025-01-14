import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../componets/supabaseClient.jsx';

const ScholarshipList = React.memo(() => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState('');
  const [applicationOngoing, setApplicationOngoing] = useState(false);

  // Fetch scholarships from Supabase
  const fetchScholarships = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('Fetched data:', data); // Debugging: Log fetched data
      setScholarships(data);
      setFilteredScholarships(data); // Initialize filtered scholarships with all data
    } catch (error) {
      console.error('Error fetching scholarships:', error); // Debugging: Log error
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchScholarships();
    }
    return () => {
      isMounted = false;
    };
  }, [fetchScholarships]);

  // Apply filters and search
  useEffect(() => {
    let filtered = scholarships;

    // Filter by search term (scholarship name)
    if (searchTerm) {
      filtered = filtered.filter((scholarship) =>
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by country
    if (selectedCountry) {
      filtered = filtered.filter(
        (scholarship) => scholarship.host_country === selectedCountry
      );
    }

    // Filter by degree level
    if (selectedDegreeLevel) {
      filtered = filtered.filter(
        (scholarship) => scholarship.degree_level === selectedDegreeLevel
      );
    }

    // Filter by application ongoing (deadline in the future)
    if (applicationOngoing) {
      const today = new Date();
      filtered = filtered.filter(
        (scholarship) => new Date(scholarship.deadline) > today
      );
    }

    setFilteredScholarships(filtered);
  }, [searchTerm, selectedCountry, selectedDegreeLevel, applicationOngoing, scholarships]);

  // Get unique countries and degree levels for dropdowns
  const uniqueCountries = [...new Set(scholarships.map((s) => s.host_country))];
  const uniqueDegreeLevels = [...new Set(scholarships.map((s) => s.degree_level))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-black">Loading scholarships...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (filteredScholarships.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-black">No scholarships found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Scholarships</h1>

        {/* Search and Filters Section */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by scholarship name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Country Filter */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">All Countries</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {/* Degree Level Filter */}
            <select
              value={selectedDegreeLevel}
              onChange={(e) => setSelectedDegreeLevel(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">All Degree Levels</option>
              {uniqueDegreeLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            {/* Application Ongoing Filter */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={applicationOngoing}
                onChange={(e) => setApplicationOngoing(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-600"
              />
              <span className="text-black">Application Ongoing</span>
            </label>
          </div>
        </div>

        {/* Scholarship List */}
        <div className="space-y-6">
          {filteredScholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105"
            >
              <h2 className="text-2xl font-bold text-black mb-4">{scholarship.name}</h2>
              <div className="space-y-2 text-black">
                <p className="text-sm">
                  <span className="font-semibold">Author:</span> {scholarship.author}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Date Posted:</span>{' '}
                  {new Date(scholarship.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Deadline:</span>{' '}
                  {new Date(scholarship.deadline).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Host Country:</span> {scholarship.host_country}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Degree Level:</span> {scholarship.degree_level}
                </p>
              </div>
              <div className="mt-4">
                <a
                  href={`/scholarship-detail/${scholarship.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ScholarshipList;