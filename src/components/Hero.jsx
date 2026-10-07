import React from 'react';
import clsx from 'clsx';
import Button from './Button';

/**
 * Hero component
 * @param {Object} props
 * @param {string} props.title - Main heading text
 * @param {string} [props.subtitle] - Subheading text
 * @param {string} [props.description] - Description text
 * @param {React.ReactNode} [props.children] - Additional content
 * @param {string} [props.backgroundImage] - Background image URL
 * @param {string} [props.className] - Additional CSS classes
 * @param {() => void} [props.primaryAction] - Primary action handler
 * @param {string} [props.primaryActionText='Get Started'] - Primary action button text
 * @param {() => void} [props.secondaryAction] - Secondary action handler
 * @param {string} [props.secondaryActionText] - Secondary action button text
 * @param {'default' | 'gradient' | 'image'} [props.variant='default'] - Hero variant
 * @returns {React.ReactElement}
 */
const Hero = ({
  title,
  subtitle,
  description,
  children,
  backgroundImage,
  className,
  primaryAction,
  primaryActionText = 'Get Started',
  secondaryAction,
  secondaryActionText,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-white',
    gradient: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
    image: 'bg-gray-100',
  };

  const textColorClasses = {
    default: 'text-gray-900',
    gradient: 'text-white',
    image: 'text-gray-900',
  };

  return (
    <div
      className={clsx(
        'relative overflow-hidden',
        variantClasses[variant],
        className
      )}
    >
      {variant === 'image' && backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      {variant === 'image' && (
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-center lg:text-left lg:max-w-2xl">
          {subtitle && (
            <p className={clsx('text-base font-semibold tracking-wide uppercase', textColorClasses[variant])}>
              {subtitle}
            </p>
          )}
          <h1 className={clsx('mt-2 text-4xl font-extrabold sm:text-5xl lg:text-6xl tracking-tight', textColorClasses[variant])}>
            {title}
          </h1>
          {description && (
            <p className={clsx('mt-5 text-xl', textColorClasses[variant] === 'text-white' ? 'text-gray-200' : 'text-gray-500')}>
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {primaryAction && (
              <Button
                variant="primary"
                size="lg"
                onClick={primaryAction}
                className={variant === 'gradient' ? 'bg-white text-indigo-600 hover:bg-gray-100' : ''}
              >
                {primaryActionText}
              </Button>
            )}
            {secondaryAction && secondaryActionText && (
              <Button
                variant="secondary"
                size="lg"
                onClick={secondaryAction}
                className={clsx(
                  variant === 'gradient' ? 'text-white border-white hover:bg-white hover:text-indigo-600' : '',
                  'bg-transparent'
                )}
              >
                {secondaryActionText}
              </Button>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Hero;