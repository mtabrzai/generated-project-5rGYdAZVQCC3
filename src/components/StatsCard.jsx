import React from 'react';
import clsx from 'clsx';
import Card from './Card';

/**
 * StatsCard component
 * @param {Object} props
 * @param {string} props.title - Title of the statistic
 * @param {string|number} props.value - Value to display
 * @param {string} [props.description] - Description text
 * @param {string} [props.trend] - Trend information (e.g., "+5% from last month")
 * @param {React.ReactNode} [props.icon] - Icon to display
 * @param {'default' | 'positive' | 'negative' | 'neutral'} [props.variant='default'] - Variant style
 * @param {string} [props.className] - Additional CSS classes
 * @param {() => void} [props.onClick] - Click handler
 * @returns {React.ReactElement}
 */
const StatsCard = ({
  title,
  value,
  description,
  trend,
  icon,
  variant = 'default',
  className,
  onClick,
}) => {
  const variantClasses = {
    default: 'text-gray-900',
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600',
  };

  const valueClasses = {
    default: 'text-3xl',
    positive: 'text-3xl',
    negative: 'text-3xl',
    neutral: 'text-3xl',
  };

  return (
    <Card
      className={clsx('transition-shadow hover:shadow-md', className)}
      onClick={onClick}
    >
      <Card.Content className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <Card.Description className="truncate">{title}</Card.Description>
          <div className={clsx('mt-1 font-semibold', valueClasses[variant])}>
            {value}
          </div>
          {(description || trend) && (
            <div className="mt-1 flex items-center gap-2 text-sm">
              {description && (
                <span className="text-gray-500 truncate">{description}</span>
              )}
              {trend && (
                <span className={clsx('font-medium', variantClasses[variant])}>
                  {trend}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className={clsx(
            'flex-shrink-0 p-3 rounded-lg',
            variant === 'positive' ? 'bg-green-50 text-green-600' :
            variant === 'negative' ? 'bg-red-50 text-red-600' :
            variant === 'neutral' ? 'bg-gray-50 text-gray-600' :
            'bg-indigo-50 text-indigo-600'
          )}>
            {icon}
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default StatsCard;