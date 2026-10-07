import React, { useState } from 'react';
import clsx from 'clsx';
import Button from './Button';
import Card from './Card';

/**
 * UserForm component
 * @param {Object} props
 * @param {string} [props.name=''] - Initial name value
 * @param {string} [props.email=''] - Initial email value
 * @param {string} [props.submitText='Save'] - Text for submit button
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {boolean} [props.showCancel=false] - Whether to show cancel button
 * @param {() => void} [props.onCancel] - Cancel handler
 * @param {(data: {name: string, email: string}) => void} props.onSubmit - Submit handler
 * @returns {React.ReactElement}
 */
const UserForm = ({
  name: initialName = '',
  email: initialEmail = '',
  submitText = 'Save',
  className,
  isLoading = false,
  showCancel = false,
  onCancel,
  onSubmit,
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [errors, setErrors] = useState({ name: '', email: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', email: '' };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name, email });
    }
  };

  return (
    <Card className={clsx('w-full', className)}>
      <form onSubmit={handleSubmit}>
        <Card.Content className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={clsx(
                'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                errors.name ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={clsx(
                'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                errors.email ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </Card.Content>

        <Card.Footer className="flex flex-col sm:flex-row gap-3 justify-end">
          {showCancel && onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              submitText
            )}
          </Button>
        </Card.Footer>
      </form>
    </Card>
  );
};

export default UserForm;