// src/components/HomeCard.js
import React, { useState } from 'react';
import { useGetUsersByHomeQuery, useUpdateUsersForHomeMutation } from '../features/api';
import Modal from './Modal';
import Spinner from './Spinner'; // Import Spinner component

const HomeCard = ({ home }) => {
  const { data: usersByHome = [], isLoading: usersLoading, error: usersError } = useGetUsersByHomeQuery(home.street_address);
  const [updateUsersForHome] = useUpdateUsersForHomeMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (selectedUsers) => {
    try {
      await updateUsersForHome({ streetAddress: home.street_address, usernames: selectedUsers }).unwrap();
      alert('Users updated successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update users:', error);
      alert('Failed to update users. Please try again later.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 flex flex-col h-[400px] w-full max-w-xs overflow-hidden">
      <div className="flex-1 overflow-auto">
        <h3 className="text-2xl font-bold mb-4">{home.street_address}</h3>
        <div className="space-y-2">
          <p><strong>State:</strong> {home.state}</p>
          <p><strong>ZIP Code:</strong> {home.zip}</p>
          <p><strong>Square Feet:</strong> {home.sqft}</p>
          <p><strong>Beds:</strong> {home.beds}</p>
          <p><strong>Baths:</strong> {home.baths}</p>
          <p><strong>List Price:</strong> ${parseFloat(home.list_price).toLocaleString()}</p>
        </div>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setIsModalOpen(true)}
      >
        Edit Users
      </button>

      {usersLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <Spinner />
        </div>
      )}

      {usersError && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <p className="text-red-500">Failed to load users. Please try again later.</p>
        </div>
      )}

      <Modal
        home={home}
        usersByHome={usersByHome || []}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default HomeCard;
