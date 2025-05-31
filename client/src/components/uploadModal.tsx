import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { uploadImage } from '../Service/userApi';
import { toast } from 'react-toastify';

interface IImage {
  _id: string;
  userId: string;
  title: string;
  imagePath: string;
  uploadedAt: string;
  order: number;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (newImage: IImage) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [newImage, setNewImage] = useState<{ title: string; file: File | null }>({
    title: '',
    file: null,
  });
  const [errors, setErrors] = useState<{ title?: string; file?: string; api?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: { title?: string; file?: string } = {};

    if (!newImage.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!newImage.file) {
      newErrors.file = 'Please select an image to upload';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewImage(prev => ({ ...prev, file }));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setNewImage(prev => ({ ...prev, title }));
  };

  const handleUpload = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm() || !newImage.file) return;

    const formData = new FormData();
    formData.append('title', newImage.title);
    formData.append('image', newImage.file);

    setIsLoading(true);
    try {
      const response = await uploadImage(formData);
      console.log("response data in modal", response);

      if (response.success) {
        const uploadedImage: IImage = response.data;
        onUpload(uploadedImage);
        setNewImage({ title: '', file: null });
        
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        onClose();
        toast.success(response.message);
      } else {
        setErrors({ api: response.message || 'Failed to upload image' });
      }
    } catch (error) {
      setErrors({ api: 'An error occurred while uploading the image' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blur effect applied to the background */}
      <div className="absolute inset-0 backdrop-blur-md z-40"></div>
      
      {/* Modal content with popup animation */}
      <div className="relative bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 p-6 rounded-2xl shadow-xl w-full max-w-md z-50 animate-modal-popup">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Upload New Image</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {errors.api && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.api}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newImage.title}
              onChange={handleTitleChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="Enter image title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.title}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              id="image-upload"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
            {errors.file && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.file}
              </p>
            )}
          </div>
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;