import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import LatestPosts from '../components/LatestPosts';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants';
import { useNavigate } from 'react-router-dom';

const featureList = [
  {
    title: 'Easy to Use',
    description: 'Intuitive interface that gets you started in minutes.',
    icon: (
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
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.437c.4-.14.833-.373 1.14-.674.31-.302.46-.72.398-1.14l-.219-1.458"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9 9 0 100-18 9 9 0 000 18z"
        />
      </svg>
    ),
  },
  {
    title: 'Powerful Features',
    description: 'All the tools you need to manage your content effectively.',
    icon: (
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
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    title: 'Secure & Reliable',
    description: 'Built with security in mind to protect your data.',
    icon: (
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
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  },
];

const Landing = () => {
  const { posts, isLoading, error } = usePosts({ limit: 3 });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePrimaryAction = () => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  const handleViewAllPosts = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        title="Welcome to Generated Project"
        subtitle="Modern Content Management"
        description="A powerful platform to create, manage, and share your content with the world."
        primaryAction={handlePrimaryAction}
        primaryActionText={isAuthenticated ? "Go to Dashboard" : "Get Started"}
        variant="gradient"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Features
          features={featureList}
          className="mb-20"
        />

        <LatestPosts
          posts={posts}
          isLoading={isLoading}
          error={error}
          onViewAll={handleViewAllPosts}
        />
      </div>
    </div>
  );
};

export default Landing;