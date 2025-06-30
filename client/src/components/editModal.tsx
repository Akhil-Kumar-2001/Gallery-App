// import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
// import { updateImage } from '../Service/userApi';
// import { toast } from 'react-toastify';

// interface IImage {
//   _id: string;
//   userId: string;
//   title: string;
//   imagePath: string;
//   uploadedAt: string;
//   order?: number;
// }

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   image: IImage | null;
//   onUpdate: (updatedImage: IImage) => void;
// }

// const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, image, onUpdate }) => {
//   const [editData, setEditData] = useState<{ title: string; file: File | null }>({
//     title: '',
//     file: null,
//   });
//   const [errors, setErrors] = useState<{ title?: string; api?: string }>({});
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (image && isOpen) {
//       setEditData({
//         title: image.title,
//         file: null,
//       });
//       setErrors({});
//     }
//   }, [image, isOpen]);

//   const validateForm = (): boolean => {
//     const newErrors: { title?: string } = {};

//     if (!editData.title.trim()) {
//       newErrors.title = 'Title is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setEditData(prev => ({ ...prev, file }));
//   };

//   const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const title = e.target.value;
//     setEditData(prev => ({ ...prev, title }));
//   };

//   const handleUpdate = async (e: FormEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     if (!validateForm() || !image) return;

//     const formData = new FormData();
//     formData.append('title', editData.title);
    
//     if (editData.file) {
//       formData.append('image', editData.file);
//     }

//     setIsLoading(true);
//     try {
//       const response = await updateImage(image._id, formData);
      
//       if (response.success) {
//         const updatedImage: IImage = response.data;
//         onUpdate(updatedImage);
        
//         setEditData({ title: '', file: null });
        
//         const fileInput = document.getElementById('edit-image-upload') as HTMLInputElement;
//         if (fileInput) fileInput.value = '';
        
//         onClose();
//         toast.success(response.message || 'Image updated successfully');
//       } else {
//         setErrors({ api: response.message || 'Failed to update image' });
//       }
//     } catch (error) {
//       setErrors({ api: 'An error occurred while updating the image' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setEditData({ title: '', file: null });
//     setErrors({});
    
//     const fileInput = document.getElementById('edit-image-upload') as HTMLInputElement;
//     if (fileInput) fileInput.value = '';
    
//     onClose();
//   };

//   if (!isOpen || !image) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="absolute inset-0 backdrop-blur-md z-40"></div>
      
//       <div className="relative bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 p-6 rounded-2xl shadow-xl w-full max-w-md z-50 animate-modal-popup">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">Edit Image</h2>
//           <button
//             onClick={handleClose}
//             className="text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <div className="mb-6">
//           <img 
//             src={image.imagePath} 
//             alt={image.title} 
//             className="w-full h-32 object-cover rounded-lg border border-gray-200"
//           />
//           <p className="text-sm text-gray-600 mt-2">Current Image</p>
//         </div>

//         {errors.api && (
//           <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             {errors.api}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//             <input
//               type="text"
//               id="edit-title"
//               name="title"
//               value={editData.title}
//               onChange={handleTitleChange}
//               className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
//               placeholder="Enter image title"
//             />
//             {errors.title && (
//               <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 {errors.title}
//               </p>
//             )}
//           </div>
          
//           <div>
//             <label htmlFor="edit-image-upload" className="block text-sm font-medium text-gray-700 mb-1">
//               Replace Image (Optional)
//             </label>
//             <input
//               type="file"
//               id="edit-image-upload"
//               name="image"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
//             />
//             <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>
//           </div>
          
//           <div className="flex gap-3 pt-4">
//             <button
//               onClick={handleClose}
//               className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg transition-all duration-300"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleUpdate}
//               disabled={isLoading}
//               className={`flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >
//               {isLoading ? 'Updating...' : 'Update Image'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;










import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { updateImage } from '../Service/userApi';
import { toast } from 'react-toastify';

interface IImage {
  _id: string;
  userId: string;
  title: string;
  imagePath: string;
  uploadedAt: string;
  order: number; // Changed from optional to required to match HomePage.tsx
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: IImage | null;
  onUpdate: (updatedImage: IImage) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, image, onUpdate }) => {
  const [editData, setEditData] = useState<{ title: string; file: File | null }>({
    title: '',
    file: null,
  });
  const [errors, setErrors] = useState<{ title?: string; api?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (image && isOpen) {
      setEditData({
        title: image.title,
        file: null,
      });
      setErrors({});
    }
  }, [image, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: { title?: string } = {};

    if (!editData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setEditData(prev => ({ ...prev, file }));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setEditData(prev => ({ ...prev, title }));
  };

  const handleUpdate = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm() || !image) return;

    const formData = new FormData();
    formData.append('title', editData.title);
    
    if (editData.file) {
      formData.append('image', editData.file);
    }

    setIsLoading(true);
    try {
      const response = await updateImage(image._id, formData);
      
      if (response.success) {
        const updatedImage: IImage = response.data;
        onUpdate(updatedImage);
        
        setEditData({ title: '', file: null });
        
        const fileInput = document.getElementById('edit-image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        onClose();
        toast.success(response.message || 'Image updated successfully');
      } else {
        setErrors({ api: response.message || 'Failed to update image' });
      }
    } catch (error) {
      setErrors({ api: 'An error occurred while updating the image' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEditData({ title: '', file: null });
    setErrors({});
    
    const fileInput = document.getElementById('edit-image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    
    onClose();
  };

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-md z-40"></div>
      
      <div className="relative bg-gradient-to-br from-blue-50/80 via-purple-50/80 to-pink-50/80 p-6 rounded-2xl shadow-xl w-full max-w-md z-50 animate-modal-popup">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Image</h2>
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <img 
            src={image.imagePath} 
            alt={image.title} 
            className="w-full h-32 object-cover rounded-lg border border-gray-200"
          />
          <p className="text-sm text-gray-600 mt-2">Current Image</p>
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
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="edit-title"
              name="title"
              value={editData.title}
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
            <label htmlFor="edit-image-upload" className="block text-sm font-medium text-gray-700 mb-1">
              Replace Image (Optional)
            </label>
            <input
              type="file"
              id="edit-image-upload"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className={`flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Updating...' : 'Update Image'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;