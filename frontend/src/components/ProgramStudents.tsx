import React from 'react';
import { useParams } from 'react-router-dom';

const ProgramStudents: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();

  return (
    <div>
      <h1>Program Students</h1>
      <p>This page will display students for program with ID: {programId}</p>
    </div>
  );
};

export default ProgramStudents;