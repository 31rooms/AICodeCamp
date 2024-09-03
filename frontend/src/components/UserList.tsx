import React, { useEffect, useState } from 'react';
import apiService from '../services/api';
import UserCard from './UserCard';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  program_id: number | null;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.getAllUsers();
        console.log('API Response:', response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          setError('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">User List</h1>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              role={user.username}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;