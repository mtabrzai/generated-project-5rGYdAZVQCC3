import React from 'react';
import clsx from 'clsx';
import Card from './Card';

/**
 * Features component
 * @param {Object} props
 * @param {Array<{title: string, description: string, icon: React.ReactNode}>} props.features - List of features to display
 * @param {'grid' | 'list'} [props.variant='grid'] - Layout variant
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
const Features = ({ features, variant = 'grid', className }) => {
  const gridClasses = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
  const listClasses = 'space-y-4';

  return (
    <div className={clsx(variant === 'grid' ? gridClasses : listClasses, className)}>
      {features.map((feature, index) => (
        <Card key={index} variant="outlined" shadow={false}>
          <Card.Content className="flex items-start gap-4">
            {feature.icon && (
              <div className="flex-shrink-0 p-2 rounded-lg bg-indigo-50 text-indigo-600">
                {feature.icon}
              </div>
            )}
            <div>
              <Card.Title>{feature.title}</Card.Title>
              <Card.Description className="mt-1">{feature.description}</Card.Description>
            </div>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

export default Features;