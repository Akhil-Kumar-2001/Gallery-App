import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  imageName: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  imageName 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blur effect applied to the background */}
      <div className="absolute inset-0 backdrop-blur-md z-40"></div>
      
      {/* Modal content with popup animation */}
      <div className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-4 z-50 animate-modal-popup">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0">
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Confirm Delete</h2>
            <p className="text-gray-600 text-sm">This action cannot be undone</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">
            Are you sure you want to delete the image{' '}
            <span className="font-semibold text-gray-900">"{imageName}"</span>?
          </p>
          <p className="text-red-600 text-sm mt-2">
            This will permanently remove the image from your gallery.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Delete Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;