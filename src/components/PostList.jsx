import React from 'react';
import clsx from 'clsx';
import PostCard from './PostCard';
import Card from './Card';
import Button from './Button';

/**
 * PostList component
 * @param {Object} props
 * @param {Array<{id: string, title: string, content: string, author: string, createdAt: string, updatedAt?: string}>} props.posts - List of posts to display
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {Error|null} [props.error=null] - Error state
 * @param {boolean} [props.hasNextPage=false] - Whether more posts are available
 * @param {() => void} [props.onLoadMore] - Handler for load more button click
 * @param {() => void} [props.onCreatePost] - Handler for create post button click
 * @param {boolean} [props.showCreateButton=false] - Whether to show create post button
 * @returns {React.ReactElement}
 */
const PostList = ({
  posts,
  className,
  isLoading = false,
  error = null,
  hasNextPage = false,
  onLoadMore,
  onCreatePost,
  showCreateButton = false,
}) => {
  return (
    <div className={clsx('space-y-6', className)}>
      {showCreateButton && onCreatePost && (
        <div className="flex justify-end">
          <Button variant="primary" onClick={onCreatePost}>
            Create Post
          </Button>
        </div>
      )}

      {error && (
        <Card>
          <Card.Content className="text-center py-8">
            <p className="text-red-600">Failed to load posts: {error.message}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoadMore}
              className="mt-4 text-indigo-600 hover:text-indigo-500"
            >
              Retry
            </Button>
          </Card.Content>
        </Card>
      )}

      {isLoading && posts.length === 0 ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <Card.Content className="space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              </Card.Content>
              <Card.Footer className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              </Card.Footer>
            </Card>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                showReadMore
              />
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center pt-4">
              <Button
                variant="secondary"
                onClick={onLoadMore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <Card>
          <Card.Content className="text-center py-8">
            <p className="text-gray-500">No posts available</p>
            {showCreateButton && onCreatePost && (
              <Button
                variant="primary"
                size="sm"
                onClick={onCreatePost}
                className="mt-4"
              >
                Create your first post
              </Button>
            )}
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default PostList;