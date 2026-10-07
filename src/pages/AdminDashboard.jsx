import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../hooks/usePosts';
import { useUsers } from '../hooks/useUsers';
import Card from '../components/Card';
import StatsCard from '../components/StatsCard';
import PostList from '../components/PostList';
import UserList from '../components/UserList';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');

  const {
    posts,
    isLoading: postsLoading,
    error: postsError,
    hasNextPage: postsHasNextPage,
    loadMore: loadMorePosts,
    refetch: refetchPosts
  } = usePosts({ limit: 5 });

  const {
    users,
    isLoading: usersLoading,
    error: usersError,
    hasNextPage: usersHasNextPage,
    loadMore: loadMoreUsers,
    refetch: refetchUsers
  } = useUsers({ limit: 5 });

  const handleCreatePost = () => {
    navigate(ROUTES.DASHBOARD + '/create');
  };

  const handleCreateUser = () => {
    navigate(ROUTES.DASHBOARD + '/users/create');
  };

  const handlePostClick = (postId) => {
    navigate(`${ROUTES.DASHBOARD}/post/${postId}`);
  };

  const handleUserClick = (userId) => {
    navigate(`${ROUTES.DASHBOARD}/users/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.name || 'Admin'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total Posts"
            value={posts.length}
            description="All blog posts"
            variant="default"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            }
          />

          <StatsCard
            title="Total Users"
            value={users.length}
            description="Registered users"
            variant="default"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.67c.328 1.122.501 2.34.501 3.573z"
                />
              </svg>
            }
          />

          <StatsCard
            title="Recent Activity"
            value="24"
            description="Last 7 days"
            variant="positive"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />

          <StatsCard
            title="System Status"
            value="Operational"
            variant="positive"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        </div>

        <div className="mb-6">
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('posts')}
              className={`
                pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'posts'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              Recent Posts
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`
                pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'users'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              Recent Users
            </button>
          </div>
        </div>

        {activeTab === 'posts' ? (
          <PostList
            posts={posts}
            isLoading={postsLoading}
            error={postsError}
            hasNextPage={postsHasNextPage}
            onLoadMore={loadMorePosts}
            onCreatePost={handleCreatePost}
            showCreateButton={true}
            onPostClick={handlePostClick}
          />
        ) : (
          <UserList
            users={users}
            isLoading={usersLoading}
            error={usersError}
            hasNextPage={usersHasNextPage}
            onLoadMore={loadMoreUsers}
            onCreateUser={handleCreateUser}
            showCreateButton={true}
            onUserClick={handleUserClick}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;