import React from 'react';
import clsx from 'clsx';
import Card from './Card';
import AvatarChip from './AvatarChip';
import Button from './Button';

/**
 * UserList component
 * @param {Object} props
 * @param {Array<{id: string, name: string, email: string, avatarUrl?: string}>} props.users - List of users to display
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {Error|null} [props.error=null] - Error state
 * @param {boolean} [props.hasNextPage=false] - Whether more users are available
 * @param {() => void} [props.onLoadMore] - Handler for load more button click
 * @param {() => void} [props.onCreateUser] - Handler for create user button click
 * @param {boolean} [props.showCreateButton=false] - Whether to show create user button
 * @param {(userId: string) => void} [props.onUserClick] - Handler for user click
 * @returns {React.ReactElement}
 */
const UserList = ({
  users,
  className,
  isLoading = false,
  error = null,
  hasNextPage = false,
  onLoadMore,
  onCreateUser,
  showCreateButton = false,
  onUserClick,
}) => {
  return (
    <div className={clsx('space-y-6', className)}>
      {showCreateButton && onCreateUser && (
        <div className="flex justify-end">
          <Button variant="primary" onClick={onCreateUser}>
            Create User
          </Button>
        </div>
      )}

      {error && (
        <Card>
          <Card.Content className="text-center py-8">
            <p className="text-red-600">Failed to load users: {error.message}</p>
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

      {isLoading && users.length === 0 ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <Card.Content className="flex items-center gap-4">
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      ) : users.length > 0 ? (
        <>
          <div className="space-y-4">
            {users.map((user) => (
              <Card
                key={user.id}
                variant="outlined"
                shadow={false}
                onClick={() => onUserClick?.(user.id)}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <Card.Content className="flex items-center gap-4">
                  <AvatarChip
                    name={user.name}
                    avatarUrl={user.avatarUrl}
                    size="md"
                  />
                  <div>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Description>{user.email}</Card.Description>
                  </div>
                </Card.Content>
              </Card>
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
            <p className="text-gray-500">No users available</p>
            {showCreateButton && onCreateUser && (
              <Button
                variant="primary"
                size="sm"
                onClick={onCreateUser}
                className="mt-4"
              >
                Create your first user
              </Button>
            )}
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default UserList;