import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from 'layouts';
import {
  LoginPage,
  NotFoundPage,
  ProfilePage,
  SearchPage,
  SuggestionsPage,
} from 'pages';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!Cookies.get('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <SearchPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/suggestions',
        element: (
          <ProtectedRoute>
            <SuggestionsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
