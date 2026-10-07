import React from 'react';
import clsx from 'clsx';

/**
 * Card component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {'default' | 'outlined' | 'elevated'} [props.variant='default'] - Card variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.shadow=true] - Whether to show shadow
 * @param {boolean} [props.fullWidth=false] - Whether card takes full width
 * @param {() => void} [props.onClick] - Click handler
 * @returns {React.ReactElement}
 */
const Card = ({
  children,
  variant = 'default',
  className,
  shadow = true,
  fullWidth = false,
  onClick,
}) => {
  const baseClasses = 'rounded-lg overflow-hidden bg-white';

  const variantClasses = {
    default: '',
    outlined: 'border border-gray-200',
    elevated: 'ring-1 ring-gray-200 ring-inset',
  };

  const shadowClasses = shadow ? 'shadow-sm' : '';

  return (
    <div
      className={clsx(
        baseClasses,
        variantClasses[variant],
        shadowClasses,
        fullWidth && 'w-full',
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/**
 * CardHeader component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Header content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
const CardHeader = ({ children, className }) => {
  return (
    <div className={clsx('px-4 py-3 sm:px-6', className)}>
      {children}
    </div>
  );
};

/**
 * CardTitle component
 * @param {Object} props
 * @param {string} props.children - Title text
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
const CardTitle = ({ children, className }) => {
  return (
    <h3 className={clsx('text-lg font-medium leading-6 text-gray-900', className)}>
      {children}
    </h3>
  );
};

/**
 * CardDescription component
 * @param {Object} props
 * @param {string} props.children - Description text
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
const CardDescription = ({ children, className }) => {
  return (
    <p className={clsx('mt-1 text-sm text-gray-500', className)}>
      {children}
    </p>
  );
};

/**
 * CardContent component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
const CardContent = ({ children, className }) => {
  return (
    <div className={clsx('px-4 py-4 sm:px-6', className)}>
      {children}
    </div>
  );
};

/**
 * CardFooter component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Footer content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
const CardFooter = ({ children, className }) => {
  return (
    <div className={clsx('px-4 py-3 sm:px-6 bg-gray-50', className)}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;