import React from 'react';
import { usePosts } from '../hooks/usePosts';
import PostList from '../components/PostList';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import Card from '../components/Card';
import Button from '../components/Button';

const Blogs = () => {
  const { posts, isLoading, error, hasNextPage, loadMore } = usePosts({ limit: 10 });
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handlePostClick = (postId) => {
    navigate(`${ROUTES.DASHBOARD}/post/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <Button variant="primary" onClick={handleCreatePost}>
            Create Post
          </Button>
        </div>

        <PostList
          posts={posts}
          isLoading={isLoading}
          error={error}
          hasNextPage={hasNextPage}
          onLoadMore={loadMore}
          onPostClick={handlePostClick}
          showCreateButton={false}
        />

        {posts.length === 0 && !isLoading && !error && (
          <Card className="mt-8">
            <Card.Content className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No blog posts yet</h3>
              <p className="mt-1 text-sm text-gray-500">Be the first to create a post</p>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreatePost}
                className="mt-4"
              >
                Create Post
              </Button>
            </Card.Content>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Blogs;