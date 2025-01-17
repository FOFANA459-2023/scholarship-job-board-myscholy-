import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../componets/supabaseClient.jsx';
import { useParams } from 'react-router-dom';

const ScholarshipDetail = React.memo(() => {
  const { id } = useParams(); // Get the scholarship ID from the URL
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch scholarship details from Supabase
  const fetchScholarship = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .eq('id', id)
        .single(); // Fetch a single record

      if (error) throw error;
      setScholarship(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchScholarship();
  }, [fetchScholarship]);

  // Helper function to format eligibility and benefits with bullet points
  const formatBulletPoints = useCallback((text) => {
    return text
      .split('\n') // Split by newline
      .map((line) => line.trim()) // Trim each line
      .filter((line) => line.length > 0) // Remove empty lines
      .map((line, index) => <li key={index}>{line}</li>); // Convert to list items
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-black">Loading scholarship details...</p>
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

  if (!scholarship) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-black">Scholarship not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* First Section: Standout Details */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8 transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-black mb-4">{scholarship.name}</h2>
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
        </div>

        {/* Second Section: Description, Eligibility, Benefits, and Link */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold text-black mb-4">Details</h3>
          <div className="space-y-4 text-black">
            <div>
              <h4 className="text-lg font-semibold mb-2">Description</h4>
              <p className="text-sm">{scholarship.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Eligibility</h4>
              <ul className="list-disc list-inside text-sm">
                {formatBulletPoints(scholarship.eligibility)}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Benefits</h4>
              <ul className="list-disc list-inside text-sm">
                {formatBulletPoints(scholarship.benefits)}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Application Link</h4>
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply through the official page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ScholarshipDetail;