
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface IImage {
  _id: string;
  userId: string;
  title: string;
  imagePath: string;
  uploadedAt: string;
}

interface ImageCardProps {
  image: IImage;
  onEdit: (image: IImage) => void;
  onDelete: (image: IImage) => void;
  className?: string;
  imageClassName?: string;
  editButtonClassName?: string;
  deleteButtonClassName?: string;
  iconSize?: number;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onEdit,
  onDelete,
  className = '',
  imageClassName = 'w-full h-48 object-cover transition-all duration-200',
  editButtonClassName = 'bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110 z-20',
  deleteButtonClassName = 'bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110 z-20',
  iconSize = 16,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(image);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(image);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img src={image.imagePath} alt={image.title} className={imageClassName} />
        
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center gap-4 transition-all duration-200">
            <img 
              src={image.imagePath} 
              alt={image.title} 
              className={`${imageClassName} absolute inset-0 brightness-75`} 
              style={{ filter: 'blur(2px)' }}
            />
            <button
              onClick={handleEdit}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className={editButtonClassName}
              title="Edit Image"
            >
              <FaEdit size={iconSize} />
            </button>
            <button
              onClick={handleDelete}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className={deleteButtonClassName}
              title="Delete Image"
            >
              <FaTrash size={iconSize} />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{image.title}</h3>
      </div>
    </div>
  );
};

export default ImageCard;
