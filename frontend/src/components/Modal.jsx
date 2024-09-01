import React, { useState, useEffect } from 'react';
import { useGetUsersQuery } from '../features/api'; // Assuming there's an API to get all users

const Modal = ({ home, usersByHome, isLoading, isOpen, onClose, onSave }) => {
  const { data: allUsers = [], isLoading: usersLoading } = useGetUsersQuery(); // Fetch all users
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (isOpen && usersByHome.length > 0) {
      // Initialize selectedUsers with the usernames of users already interested in the home
      setSelectedUsers(usersByHome.map(user => user.username));
    }
  }, [usersByHome, isOpen]);

  const handleCheckboxChange = (username) => {
    setSelectedUsers(prev =>
      prev.includes(username)
        ? prev.filter(user => user !== username)
        : [...prev, username]
    );
  };

  const handleSave = () => {
    if (selectedUsers.length === 0) {
      alert('Please select at least one user.');
      return;
    }
    onSave(selectedUsers); // Call the parent function to handle saving
  };

  if (!isOpen) return null; // Hide modal if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Users for {home.street_address}</h2>
        {(isLoading || usersLoading) ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div>
            {allUsers.map(user => (
              <div key={user.username} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.username)}
                  onChange={() => handleCheckboxChange(user.username)}
                  className="mr-2"
                />
                <label className="text-gray-800">{user.username}</label>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
