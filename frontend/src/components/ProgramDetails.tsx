import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/api';
import UserCard from './UserCard';

interface Student {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    program_id: number;
    student_id: number;
    registration_date: string;
  };
}

interface Program {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  students: Student[];
}

const ProgramDetails: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await apiService.getProgram(Number(programId));
        if (response.data && response.data.success && response.data.data) {
          setProgram(response.data.data);
        } else {
          setError('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching program details:', err);
        setError('Failed to fetch program details');
        setLoading(false);
      }
    };

    fetchProgramDetails();
  }, [programId]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  if (!program) return <div className="text-center py-4">Program not found</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">{program.name}</h1>
      
      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Students</h2>
      {program.students.length === 0 ? (
        <p className="text-gray-500">No students enrolled in this program.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {program.students.map((student) => (
            <UserCard
              id={student.id}
              key={student.id}
              name={student.name}
              role="Student"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgramDetails;