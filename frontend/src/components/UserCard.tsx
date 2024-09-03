import React from 'react';

interface UserCardProps {
  name: string;
  role: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, role }) => {
  const avatarUrl = `https://picsum.photos/seed/${name}/80`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white mr-4">
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover rounded-full" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;