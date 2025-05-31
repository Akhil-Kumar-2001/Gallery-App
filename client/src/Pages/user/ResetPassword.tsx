import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { resetPassword } from '../../Service/userApi';
import { toast } from 'react-toastify';
import { useParams,useNavigate } from 'react-router-dom'

interface FormData {
    cacheCode: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    cacheCode?: string;
    password?: string;
    confirmPassword?: string;
    api?: string;
}

const ResetPassword: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        cacheCode: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const { email } = useParams();
    const navigate = useNavigate();


    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.cacheCode.trim()) {
            newErrors.cacheCode = 'Verification code is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await resetPassword(formData.cacheCode, formData.password, email || '');

                if (response.success) {
                    toast.success(response.message);
                    setFormData({ cacheCode: '', password: '', confirmPassword: '' });
                    navigate('/signin')
                } else {
                    setErrors({ api: response.message || 'Password reset failed' });
                }
            } catch (error) {
                setErrors({ api: 'An error occurred. Please try again.' });
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
            <div className="relative bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">Reset Your Password</h2>

                {errors.api && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errors.api}
                    </div>
                )}

                <form>
                    {/* Verification Code */}
                    <div className="mb-4">
                        <label htmlFor="cacheCode" className="block text-sm font-medium text-gray-700">Verification Code</label>
                        <input
                            type="text"
                            id="cacheCode"
                            name="cacheCode"
                            value={formData.cacheCode}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-4 py-2 border ${errors.cacheCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                        {errors.cacheCode && <p className="text-red-500 text-sm mt-1">{errors.cacheCode}</p>}
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                        Reset Password
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Remember your password?{' '}
                    <button onClick={()=>navigate('/signin')} className="text-blue-500 hover:text-blue-600 font-medium hover:underline">
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
