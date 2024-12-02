import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Vote, Home, Settings, LogOut } from 'lucide-react';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Vote className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">ThusVote</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
                <Link to="/campaigns" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                  <Vote className="h-4 w-4 mr-1" />
                  Campaigns
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link to="/settings" className="p-2 text-gray-500 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </Link>
              <button className="ml-3 p-2 text-gray-500 hover:text-gray-900">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;