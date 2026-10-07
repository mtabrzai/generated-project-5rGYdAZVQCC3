import React from 'react';
import clsx from 'clsx';

/**
 * AvatarChip component
 * @param {Object} props
 * @param {string} props.name - Name to display
 * @param {string} [props.avatarUrl] - URL of the avatar image
 * @param {string} [props.size='md'] - Size of the avatar chip ('sm' | 'md' | 'lg')
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} [props.children] - Additional content to render
 * @returns {React.ReactElement}
 */
const AvatarChip = ({ name, avatarUrl, size = 'md', className, children }) => {
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
  };

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  const containerSizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <div className={clsx('inline-flex items-center gap-2 rounded-full bg-gray-100', containerSizeClasses[size], className)}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className={clsx('rounded-full object-cover', sizeClasses[size])}
        />
      ) : (
        <div className={clsx('flex items-center justify-center rounded-full bg-indigo-100 text-indigo-800 font-medium', sizeClasses[size])}>
          {getInitials(name)}
        </div>
      )}
      <span className="font-medium text-gray-900">{name}</span>
      {children}
    </div>
  );
};

export default AvatarChip;