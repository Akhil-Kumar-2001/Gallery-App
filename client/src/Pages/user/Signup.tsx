// import React, { useState, type FormEvent, type ChangeEvent } from 'react';
// import { Signup as signupApi } from '../../Service/userApi'
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// // Define form data interface based on Mongoose model
// interface FormData {
//     username: string;
//     email: string;
//     phoneNumber: string;
//     password: string;
//     confirmPassword: string;
// }

// // Define errors interface for form validation
// interface FormErrors {
//     username?: string;
//     email?: string;
//     phoneNumber?: string;
//     password?: string;
//     confirmPassword?: string;
//     api?: string;
// }

// const Signup: React.FC = () => {
//     const [formData, setFormData] = useState<FormData>({
//         username: '',
//         email: '',
//         phoneNumber: '',
//         password: '',
//         confirmPassword: ''
//     });
//     const [errors, setErrors] = useState<FormErrors>({});
//     const navigate = useNavigate();

//     const validateForm = (): boolean => {
//         const newErrors: FormErrors = {};

//         if (!formData.username.trim()) {
//             newErrors.username = 'Username is required';
//         }

//         if (!formData.email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//             newErrors.email = 'Invalid email format';
//         }

//         if (!formData.phoneNumber.trim()) {
//             newErrors.phoneNumber = 'Phone number is required';
//         } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
//             newErrors.phoneNumber = 'Invalid phone number format';
//         }

//         if (!formData.password) {
//             newErrors.password = 'Password is required';
//         } else if (formData.password.length < 8) {
//             newErrors.password = 'Password must be at least 8 characters';
//         }

//         if (formData.password !== formData.confirmPassword) {
//             newErrors.confirmPassword = 'Passwords do not match';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
//         e.preventDefault();

//         if (validateForm()) {
//             try {
//                 const response = await signupApi({
//                     username: formData.username,
//                     email: formData.email,
//                     phoneNumber: formData.phoneNumber,
//                     password: formData.password,
//                 });
        
//         if (response.success) {
//                     toast.success('Signup successful!');
//                     setFormData({
//                         username: '',
//                         email: '',
//                         phoneNumber: '',
//                         password: '',
//                         confirmPassword: ''
//                     });
//                     navigate('/')
//                 } else {
//                     const errorData: { message?: string } = await response.json();
//                     setErrors({ api: errorData.message || 'Signup failed' });
//                 }
//             } catch (error) {
//                 setErrors({ api: 'An error occurred. Please try again.' });
//             }
//         }
//     };

//     const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
//             <div className="relative bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all hover:shadow-2xl border border-transparent bg-clip-padding">
//                 <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">Join Our Gallery</h2>

//                 {errors.api && (
//                     <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         {errors.api}
//                     </div>
//                 )}

//                 <div className="space-y-6">
//                     <div className="relative">
//                         <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                         <div className="flex items-center">
//                             <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                             </svg>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 name="username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
//                                 placeholder="Enter your username"
//                             />
//                         </div>
//                         {errors.username && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 {errors.username}
//                             </p>
//                         )}
//                     </div>

//                     <div className="relative">
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                         <div className="flex items-center">
//                             <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                             </svg>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
//                                 placeholder="Enter your email"
//                             />
//                         </div>
//                         {errors.email && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 {errors.email}
//                             </p>
//                         )}
//                     </div>

//                     <div className="relative">
//                         <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                         <div className="flex items-center">
//                             <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                             </svg>
//                             <input
//                                 type="tel"
//                                 id="phoneNumber"
//                                 name="phoneNumber"
//                                 value={formData.phoneNumber}
//                                 onChange={handleChange}
//                                 className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
//                                 placeholder="Enter your phone number"
//                             />
//                         </div>
//                         {errors.phoneNumber && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 {errors.phoneNumber}
//                             </p>
//                         )}
//                     </div>

//                     <div className="relative">
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                         <div className="flex items-center">
//                             <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m4-4c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m6-4c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m-2-10v2m-6 0v2m6 0v2m-10-4v2m0 0c-1.104 0-2 .896-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6c0-1.104-.896-2-2-2" />
//                             </svg>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
//                                 placeholder="Enter your password"
//                             />
//                         </div>
//                         {errors.password && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 {errors.password}
//                             </p>
//                         )}
//                     </div>

//                     <div className="relative">
//                         <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//                         <div className="flex items-center">
//                             <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m4-4c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m6-4c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m-2-10v2m-6 0v2m6 0v2m-10-4v2m0 0c-1.104 0-2 .896-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6c0-1.104-.896-2-2-2" />
//                             </svg>
//                             <input
//                                 type="password"
//                                 id="confirmPassword"
//                                 name="confirmPassword"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
//                                 placeholder="Confirm your password"
//                             />
//                         </div>
//                         {errors.confirmPassword && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 {errors.confirmPassword}
//                             </p>
//                         )}
//                     </div>

//                     <button
//                         onClick={handleSubmit}
//                         className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
//                     >
//                         Sign Up
//                     </button>
//                 </div>

//                 <p className="mt-6 text-center text-sm text-gray-600">
//                     Already have an account? <button onClick={()=>navigate('/signin')} className="text-blue-500 hover:text-blue-600 font-medium hover:underline">Log in</button>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Signup;












import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { Signup as signupApi } from '../../Service/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Define form data interface based on Mongoose model
interface FormData {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

// Define errors interface for form validation
interface FormErrors {
    username?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
    api?: string;
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await signupApi({
                    username: formData.username,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    password: formData.password,
                });

                if (response.success) {
                    toast.success('Signup successful!');
                    setFormData({
                        username: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        confirmPassword: ''
                    });
                    navigate('/');
                } else {
                    const errorData = await response.json();
                    const newErrors: FormErrors = {};

                    // Check if the error is a user already exists error
                    if (errorData.message === 'User already exists') {
                        newErrors.email = 'This email is already registered';
                    } else if (errorData.errors) {
                        // Map other backend validation errors to form fields
                        errorData.errors.forEach((err: { path: string; msg: string }) => {
                            if (['username', 'email', 'phoneNumber', 'password'].includes(err.path)) {
                                newErrors[err.path as keyof FormErrors] = err.msg;
                            } else {
                                newErrors.api = err.msg || 'Signup failed';
                            }
                        });
                    } else {
                        newErrors.api = errorData.message || 'Signup failed';
                    }
                    setErrors(newErrors);
                }
            } catch (error) {
                // Only set network error if no API response was received
                console.log(error)
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
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">Join Our Gallery</h2>

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
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <div className="flex items-center">
                            <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                placeholder="Enter your username"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.username && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.username}
                            </p>
                        )}
                    </div>

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

                    <div className="relative">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="flex items-center">
                            <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C6.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                placeholder="Enter your phone number"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.phoneNumber}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="flex items-center">
                            <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m4-4c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m6-4c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m-2-10v2m-6 0v2m6 0v2m-10-4v2m0 0c-1.104 0-2 .896-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6c0-1.104-.896-2-2-2" />
                            </svg>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                placeholder="Enter your password"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="flex items-center">
                            <svg className="absolute left-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m4-4c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m6-4c0-1.104-.896-2-2-2s-2 .896-2 2 2 4 2 4m-2-10v2m-6 0v2m6 0v2m-10-4v2m0 0c-1.104 0-2 .896-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6c0-1.104-.896-2-2-2" />
                            </svg>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                                placeholder="Confirm your password"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {errors.confirmPassword}
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
                            'Sign Up'
                        )}
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <button onClick={() => navigate('/signin')} className="text-blue-500 hover:text-blue-600 font-medium hover:underline">Log in</button>
                </p>
            </div>
        </div>
    );
};

export default Signup;