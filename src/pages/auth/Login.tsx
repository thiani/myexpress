import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center px-4 md:px-6 py-12">
        {/* Logo Section */}
        <div className="w-full max-w-sm text-center mb-8">
          <img 
            src="/src/assets/images/logo/logo.png"
            alt="Zawabu Auto Logo"
            className="h-20 mx-auto"
          />
          <h1 className="mt-4 text-xl font-semibold text-gray-900">
            Welcome back to Zawabu Auto Admin
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>

        {/* Help Links */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">
            Having trouble logging in?{' '}
            <a href="#" className="text-brand-blue-500 hover:text-brand-blue-600">
              Contact support
            </a>
          </p>
          <p>
            Forgot your password?{' '}
            <a href="#" className="text-brand-blue-500 hover:text-brand-blue-600">
              Reset it here
            </a>
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Zawabu Auto. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;