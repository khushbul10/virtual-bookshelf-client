import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      photoURL: e.target.photoURL.value,
      password: e.target.password.value,
    };
    const validatePassword = (password) => {
      return (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        password.length >= 6
      );
    };

    if (!validatePassword(formData.password)) {
      toast.error('Password must be at least 6 characters, include uppercase and lowercase letters.');
      return;
    }

    registerUser(formData.email, formData.password)
      .then(() => {
        updateUserProfile({
          displayName: formData.name,
          photoURL: formData.photoURL,
        });
        axios.post(`${import.meta.env.VITE_API_URL}/users`, {
          name: formData.name,
          email: formData.email,
          photoURL: formData.photoURL,
        });
        toast.success('Registration successful!');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message || 'Registration failed!');
      });
  };
  document.title = 'Register - Virtual Bookshelf';
  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center">
      <form
        className="bg-white shadow-xl rounded-lg px-8 py-10 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Register</h2>

        <input
          className="border border-gray-300 rounded-lg w-full p-2 mb-4"
          type="text"
          name="name"
          placeholder="Name"
          required
        />

        <input
          className="border border-gray-300 rounded-lg w-full p-2 mb-4"
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        <input
          className="border border-gray-300 rounded-lg w-full p-2 mb-4"
          type="text"
          name="photoURL"
          placeholder="Photo URL"
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
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
