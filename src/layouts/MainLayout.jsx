import React from 'react';
import Footer from '../components/Footer';

// For react-router: use "Outlet" for nested routes
import { Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';
import LoadingPage from '../pages/LoadingPage';
import Navbar from '../components/NavBar';

const MainLayout = () => {
  const { loading } = useAuth();
  if (loading) {
    return (
      <LoadingPage></LoadingPage>
    );
  }
  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      <Navbar></Navbar>
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
