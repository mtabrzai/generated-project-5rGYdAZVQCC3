import React, { useState } from 'react';
import clsx from 'clsx';
import Button from './Button';
import Card from './Card';

/**
 * PostForm component
 * @param {Object} props
 * @param {string} [props.title=''] - Initial title value
 * @param {string} [props.content=''] - Initial content value
 * @param {string} [props.submitText='Create Post'] - Text for submit button
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {boolean} [props.showCancel=false] - Whether to show cancel button
 * @param {() => void} [props.onCancel] - Cancel handler
 * @param {(data: {title: string, content: string}) => void} props.onSubmit - Submit handler
 * @returns {React.ReactElement}
 */
const PostForm = ({
  title: initialTitle = '',
  content: initialContent = '',
  submitText = 'Create Post',
  className,
  isLoading = false,
  showCancel = false,
  onCancel,
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [errors, setErrors] = useState({ title: '', content: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { title: '', content: '' };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ title, content });
    }
  };

  return (
    <Card className={clsx('w-full', className)}>
      <form onSubmit={handleSubmit}>
        <Card.Content className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={clsx(
                'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                errors.title ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Post title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={clsx(
                'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                errors.content ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Post content"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
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

export default PostForm;