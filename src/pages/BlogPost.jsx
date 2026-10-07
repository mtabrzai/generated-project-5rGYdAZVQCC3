import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import AvatarChip from '../components/AvatarChip';
import PostForm from '../components/PostForm';
import { ROUTES } from '../constants';
import { API_BASE_URL } from '../constants';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/posts/${id}`);

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

  const handleUpdatePost = async ({ title, content }) => {
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
      setPost(data.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating post:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post');
      }

      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      console.error('Error deleting post:', err);
      setError(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (isLoading && !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <Card.Content className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </Card.Content>
            <Card.Footer className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
            </Card.Footer>
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

  const isAuthor = isAuthenticated && post.author === (typeof post.author === 'object' ? post.author.id : post.author);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {isEditing ? (
          <PostForm
            title={post.title}
            content={post.content}
            submitText="Update Post"
            isLoading={isLoading}
            showCancel
            onCancel={handleCancelEdit}
            onSubmit={handleUpdatePost}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="secondary"
                onClick={() => navigate(ROUTES.DASHBOARD)}
                className="flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </Button>
              {isAuthor && (
                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleDeletePost}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </Button>
                </div>
              )}
            </div>

            <Card>
              <Card.Content>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <div className="prose max-w-none text-gray-700">
                  <p>{post.content}</p>
                </div>
              </Card.Content>
              <Card.Footer className="flex items-center justify-between pt-4 border-t border-gray-200">
                <AvatarChip
                  name={typeof post.author === 'object' ? post.author.name : post.author}
                  size="sm"
                />
                <span className="text-sm text-gray-500">
                  {new Date(post.updatedAt || post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </Card.Footer>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPost;