import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { nav } from 'motion/react-client';

const Login = () => {
  const { loginUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      toast.success('Login successful!');
      // Redirect to the page user was trying to access before login
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Login failed!');
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast.success('Login with Google successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Google login failed!');
    }
  };
  document.title = 'Login - Virtual Bookshelf';
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <form
        className="bg-white shadow-xl rounded-lg px-8 py-10 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Login</h2>

        <input
          className="border border-gray-300 rounded-lg w-full p-2 mb-4"
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        <input
          className="border border-gray-300 rounded-lg w-full p-2 mb-6"
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg w-full p-2"
          type="submit"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg w-full p-2 mt-4"
        >
          Login with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-purple-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
