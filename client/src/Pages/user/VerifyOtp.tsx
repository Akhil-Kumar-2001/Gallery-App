import React, { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { VerifyCode } from '../../Service/userApi'; // Assuming you have a service to verify the code

// Define form data interface for verification
interface VerificationData {
  code: string[];
}

const Verification: React.FC = () => {
  const [verificationData, setVerificationData] = useState<VerificationData>({
    code: ['', '', '', '', '', ''], // Array for 6 alphanumeric characters
  });
  const [errors, setErrors] = useState<{ api?: string; code?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Refs for input focus
  const navigate = useNavigate();
  const { email } = useParams<{ email: string }>(); // Get email from URL params

  // Validate form in real-time to enable/disable verify button
  useEffect(() => {
    const isValid = verificationData.code.every(char => char.length === 1 && /^[a-zA-Z0-9]$/.test(char));
    setIsFormValid(isValid);
  }, [verificationData]);

  // Handle input change for each character
  const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.toLowerCase(); // Convert to lowercase to match example (hdi1cp)
    if (/^[a-zA-Z0-9]?$/.test(value)) { // Allow only single alphanumeric character or empty
      setVerificationData(prev => ({
        ...prev,
        code: prev.code.map((char, i) => (i === index ? value : char)),
      }));
      // Move to next input if character is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && !verificationData.code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event for the entire code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().toLowerCase();
    if (/^[a-zA-Z0-9]{6}$/.test(pastedData)) { // Validate 6 alphanumeric characters
      const newCode = pastedData.split('');
      setVerificationData({ code: newCode });
      inputRefs.current[5]?.focus();
    } else {
      setErrors({ code: 'Invalid code format. Use 6 alphanumeric characters.' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    if (isFormValid && email) {
      setIsLoading(true);
      try {
        const cacheCode = verificationData.code.join('');
        const response = await VerifyCode(email, cacheCode);

        if (response.success) {
          toast.success('Verification successful! Account created.');
          setVerificationData({ code: ['', '', '', '', '', ''] });
          navigate('/');
        } else {
          const errorData: { message?: string } = await response.json();
          setErrors({ api: errorData.message || 'Verification failed' });
        }
      } catch (error) {
        setErrors({ api: 'An error occurred. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    } else if (!email) {
      setErrors({ api: 'Email is missing from the request.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="relative bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all hover:shadow-2xl border border-transparent bg-clip-padding">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">Verify Your Email</h2>

        <p className="text-center text-sm text-gray-600 mb-6">
          Enter the 6-character code sent to your email
        </p>

        {errors.api && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.api}
          </div>
        )}

        <div className="space-y-6">
          <div className="flex justify-between gap-2">
            {verificationData.code.map((char, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={char}
                onChange={handleChange(index)}
                onKeyDown={handleKeyDown(index)}
                onPaste={index === 0 ? handlePaste : undefined}
                ref={el => { inputRefs.current[index] = el; }}
                className="w-12 h-12 text-center text-lg font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                disabled={isLoading}
              />
            ))}
          </div>

          {errors.code && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.code}
            </p>
          )}

          <button
            onClick={handleSubmit}
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
              !isFormValid || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'
            }`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
              </svg>
            ) : null}
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Didn’t receive a code?{' '}
          <button onClick={() => navigate('/resend-code')} className="text-blue-500 hover:text-blue-600 font-medium hover:underline" disabled={isLoading}>
            Resend Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default Verification;