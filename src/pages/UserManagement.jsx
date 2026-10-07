import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import Card from '../components/Card';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const UserManagement = () => {
  const navigate = useNavigate();
  const [editingUser, setEditingUser] = useState(null);
  const {
    users,
    isLoading,
    error,
    hasNextPage,
    loadMore,
    refetch
  } = useUsers({ limit: 10 });

  const handleCreateUser = () => {
    setEditingUser({ name: '', email: '' });
  };

  const handleEditUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditingUser(user);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const handleSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users${editingUser?.id ? `/${editingUser.id}` : ''}`, {
        method: editingUser?.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save user');
      }

      await refetch();
      setEditingUser(null);
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <Button
            variant="primary"
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Button>
        </div>

        {editingUser ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingUser.id ? 'Edit User' : 'Create New User'}
              </h2>
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Cancel
              </Button>
            </div>
            <UserForm
              name={editingUser.name}
              email={editingUser.email}
              submitText={editingUser.id ? 'Update User' : 'Create User'}
              onSubmit={handleSubmit}
              showCancel
              onCancel={handleCancel}
            />
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <Button variant="primary" onClick={handleCreateUser}>
                Create User
              </Button>
            </div>

            <UserList
              users={users}
              isLoading={isLoading}
              error={error}
              hasNextPage={hasNextPage}
              onLoadMore={loadMore}
              showCreateButton={false}
              onUserClick={handleEditUser}
            />

            {users.length === 0 && !isLoading && !error && (
              <Card className="mt-8">
                <Card.Content className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                  <p className="mt-1 text-sm text-gray-500">Create your first user to get started</p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCreateUser}
                    className="mt-4"
                  >
                    Create User
                  </Button>
                </Card.Content>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;