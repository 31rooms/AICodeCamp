import React from 'react';
import { useParams } from 'react-router-dom';

const UserPrograms: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div>
      <h1>User Programs</h1>
      <p>This page will display programs for user with ID: {userId}</p>
    </div>
  );
};

export default UserPrograms;