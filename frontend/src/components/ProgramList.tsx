import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

interface Program {
  id: number;
  name: string;
  description: string;
}

const ProgramList: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await apiService.getAllPrograms();
        console.log('API Response:', response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setPrograms(response.data.data);
        } else {
          setError('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setError('Failed to fetch programs');
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Program List</h1>
      {programs.length === 0 ? (
        <p className="text-gray-500">No programs found.</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {programs.map((program) => (
              <li key={program.id}>
                <Link to={`/programs/${program.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">{program.name}</p>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {program.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProgramList;