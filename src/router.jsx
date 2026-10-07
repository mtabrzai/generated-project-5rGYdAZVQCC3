import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Blogs from './pages/Blogs';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import BlogPost from './pages/BlogPost';
import UserManagement from './pages/UserManagement';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTES } from './constants';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'admin',
            element: <AdminDashboard />,
          },
          {
            path: 'blogs',
            element: <Blogs />,
          },
          {
            path: 'create',
            element: <CreatePost />,
          },
          {
            path: 'post/:id',
            element: <BlogPost />,
          },
          {
            path: 'post/:id/edit',
            element: <EditPost />,
          },
          {
            path: 'users',
            children: [
              {
                index: true,
                element: <UserManagement />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;