import React from 'react';
import clsx from 'clsx';
import Card from './Card';
import AvatarChip from './AvatarChip';
import Button from './Button';

/**
 * PostCard component
 * @param {Object} props
 * @param {string} props.id - Post ID
 * @param {string} props.title - Post title
 * @param {string} props.content - Post content
 * @param {string} props.author - Post author name
 * @param {string} props.createdAt - Post creation date
 * @param {string} [props.updatedAt] - Post last update date
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.showAuthor=true] - Whether to show author information
 * @param {boolean} [props.showDate=true] - Whether to show date information
 * @param {boolean} [props.showReadMore=false] - Whether to show read more button
 * @param {() => void} [props.onReadMore] - Handler for read more button click
 * @param {() => void} [props.onClick] - Click handler for the entire card
 * @returns {React.ReactElement}
 */
const PostCard = ({
  id,
  title,
  content,
  author,
  createdAt,
  updatedAt,
  className,
  showAuthor = true,
  showDate = true,
  showReadMore = false,
  onReadMore,
  onClick,
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className={className} onClick={onClick}>
      <Card.Content>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Card.Title>{title}</Card.Title>
            <p className="mt-1 text-sm text-gray-500 line-clamp-3">
              {content}
            </p>
          </div>
        </div>
      </Card.Content>
      {(showAuthor || showDate) && (
        <Card.Footer className="flex items-center justify-between pt-4 border-t border-gray-200">
          {showAuthor && (
            <AvatarChip
              name={author}
              size="sm"
            />
          )}
          {showDate && (
            <span className="text-sm text-gray-500">
              {formatDate(updatedAt || createdAt)}
            </span>
          )}
        </Card.Footer>
      )}
      {showReadMore && onReadMore && (
        <Card.Footer className="pt-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onReadMore();
            }}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Read more
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default PostCard;