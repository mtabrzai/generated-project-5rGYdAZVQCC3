import React from 'react';
import clsx from 'clsx';
import Card from './Card';
import AvatarChip from './AvatarChip';

/**
 * LatestPosts component
 * @param {Object} props
 * @param {Array<{id: string, title: string, content: string, author: string, createdAt: string}>} props.posts - List of posts to display
 * @param {string} [props.className] - Additional CSS classes
 * @param {number} [props.maxPosts=3] - Maximum number of posts to display
 * @param {() => void} [props.onViewAll] - Handler for view all button click
 * @returns {React.ReactElement}
 */
const LatestPosts = ({ posts, className, maxPosts = 3, onViewAll }) => {
  const displayedPosts = posts.slice(0, maxPosts);

  return (
    <div className={clsx('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Latest Posts</h2>
        {onViewAll && posts.length > maxPosts && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <Card key={post.id} variant="outlined" shadow={false}>
              <Card.Content>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Card.Title>{post.title}</Card.Title>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {post.content}
                    </p>
                  </div>
                </div>
                <Card.Footer className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <AvatarChip
                    name={post.author}
                    size="sm"
                  />
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </Card.Footer>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Card>
            <Card.Content className="text-center py-8">
              <p className="text-gray-500">No posts available</p>
            </Card.Content>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LatestPosts;