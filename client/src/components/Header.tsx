import React from 'react';
import { useAuthStore } from '../store/userAuthStore';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        useAuthStore.getState().logout()
        navigate('/signin') // redirect
    };

    return (
        <header className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* App Name (Left Side) */}
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        <a href="/" className="hover:text-blue-600 transition-colors">Gallery</a>
                    </h1>
                </div>

                {/* Logout Icon (Right Side) */}
                <div className="flex items-center">
                    <button
                        onClick={handleLogout}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        title="Log Out"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;