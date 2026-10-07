import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { ROUTES } from '../constants';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
          <p className="mt-2 text-sm text-gray-500">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <Card.Content className="text-center py-8">
            <Button
              variant="primary"
              onClick={() => navigate(ROUTES.HOME)}
              className="w-full sm:w-auto"
            >
              Go back home
            </Button>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;