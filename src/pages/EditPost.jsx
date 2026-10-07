import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PostForm from '../components/PostForm';
import Card from '../components/Card';
import Button from '../components/Button';
import { API_BASE_URL, ROUTES } from '../constants';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch post');
      }

      const data = await response.json();
      setPost(data.data);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async ({ title, content }) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }

      const data = await response.json();
      navigate(`${ROUTES.DASHBOARD}/post/${data.data.id}`);
    } catch (err) {
      console.error('Error updating post:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`${ROUTES.DASHBOARD}/post/${id}`);
  };

  useEffect(() => {
    fetchPost();
  }, [id, token]);

  if (isLoading && !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <Card.Content className="space-y-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-24 bg-gray-200 rounded animate-pulse w-full"></div>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <Card.Content className="text-center py-8">
              <p className="text-red-600">Failed to load post: {error.message}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchPost}
                className="mt-4 text-indigo-600 hover:text-indigo-500"
              >
                Retry
              </Button>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <Card.Content className="text-center py-8">
              <p className="text-gray-500">Post not found</p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate(ROUTES.DASHBOARD)}
                className="mt-4"
              >
                Back to Dashboard
              </Button>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
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

        {error && (
          <Card className="mb-6">
            <Card.Content className="text-center py-4">
              <p className="text-red-600">Error: {error.message}</p>
            </Card.Content>
          </Card>
        )}

        <PostForm
          title={post.title}
          content={post.content}
          submitText="Update Post"
          isLoading={isLoading}
          showCancel
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditPost;