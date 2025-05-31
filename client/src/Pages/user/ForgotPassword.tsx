import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { forgotPassword } from '../../Service/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Define form data interface
interface FormData {
  email: string;
}

// Define errors interface for form validation
interface FormErrors {
  email?: string;
  api?: string;
}

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await forgotPassword(formData.email);
        
        if (response.success) {
          toast.success(response.message);
          navigate(`/reset-password/${formData.email}`);
          setFormData({ email: '' });
        } 
      } catch (error) {
        setErrors({ api: 'An error occurred. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="relative bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all hover:shadow-2xl border border-transparent bg-clip-padding">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">Reset Your Password</h2>
        
        {errors.api && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.api}
          </div>
        )}
        
        <div className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center">
              <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </div>
            ) : (
              'Verify'
            )}
          </button>
        </div>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password? <button onClick={()=>navigate('/signin')} className="text-blue-500 hover:text-blue-600 font-medium hover:underline">Log in</button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;