import React, { useState } from 'react';
import { useGetUsersQuery, useGetHomesByUserQuery } from '../features/api';
import HomeCard from './HomeCard';
import Skeleton from 'react-loading-skeleton';

const HomesForUser = () => {
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();
  const [selectedUser, setSelectedUser] = useState('');
  const { data: homes = [], isLoading: homesLoading } = useGetHomesByUserQuery(selectedUser, {
    skip: !selectedUser, // Skip the query if no user is selected
  });

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <select
          onChange={handleUserChange}
          value={selectedUser}
          className="p-2 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a user</option>
          {usersLoading ? (
            <option>Loading...</option>
          ) : (
            users.map(user => (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            ))
          )}
        </select>
      </div>

      {selectedUser && (
        homesLoading ? (
          <div className="space-y-4">
            <Skeleton count={5} height={150} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {homes.length > 0 ? (
              homes.map(home => (
                <HomeCard key={home.street_address} home={home} />
              ))
            ) : (
              <p className="text-gray-500">No homes available for this user.</p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default HomesForUser;
