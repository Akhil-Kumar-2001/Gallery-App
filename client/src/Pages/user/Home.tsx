import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaEdit, FaTrash, FaGripVertical } from 'react-icons/fa';
import UploadModal from '../../components/uploadModal';
import EditModal from '../../components/editModal';
import DeleteConfirmModal from '../../components/deleteModal';
import { getImages, updateImageOrder, deleteImage } from '../../Service/userApi';
import { toast } from 'react-toastify';

interface IImage {
  _id: string;
  userId: string;
  title: string;
  imagePath: string;
  uploadedAt: string;
}

interface SortableImageProps {
  image: IImage;
  onEdit: (image: IImage) => void;
  onDelete: (image: IImage) => void;
  className?: string;
  imageClassName?: string;
  dragHandleClassName?: string;
  editButtonClassName?: string;
  deleteButtonClassName?: string;
  iconSize?: number;
}

const SortableImage: React.FC<SortableImageProps> = ({
  image,
  onEdit,
  onDelete,
  className = '',
  imageClassName = 'w-full h-48 object-cover transition-all duration-200',
  dragHandleClassName = 'absolute top-2 left-2 w-6 h-6 bg-gray-500 bg-opacity-70 rounded cursor-move z-10 flex items-center justify-center',
  editButtonClassName = 'bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110 z-20',
  deleteButtonClassName = 'bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110 z-20',
  iconSize = 16,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: image._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

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

  const dragHandleProps = {
    ...attributes,
    ...listeners,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div {...dragHandleProps} className={dragHandleClassName} title="Drag to reorder">
        <FaGripVertical className="text-white" size={iconSize} />
      </div>

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

const HomePage: React.FC = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ api?: string }>({});
  const [isOrderChanged, setIsOrderChanged] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await getImages();
        if (response.success) {
          setImages(response.data);
        } else {
          setErrors({ api: 'Failed to load images' });
        }
      } catch (error) {
        setErrors({ api: 'An error occurred while loading images' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((prevImages) => {
        const oldIndex = prevImages.findIndex((image) => image._id === active.id);
        const newIndex = prevImages.findIndex((image) => image._id === over.id);
        const reorderedImages = [...prevImages];
        const [movedImage] = reorderedImages.splice(oldIndex, 1);
        reorderedImages.splice(newIndex, 0, movedImage);
        return reorderedImages;
      });
      setIsOrderChanged(true);
    }
  };

  const handleSaveOrder = async () => {
    try {
      const imageOrder = images.map((image, index) => ({
        _id: image._id,
        order: index,
      }));
      const response = await updateImageOrder(imageOrder);
      if (response.success) {
        setIsOrderChanged(false);
        toast.success(response.message);
      } else {
        setErrors({ api: 'Failed to save image order' });
      }
    } catch (error) {
      setErrors({ api: 'An error occurred while saving image order' });
    }
  };

  const handleImageUpload = (newImage: IImage) => {
    setImages((prev) => [...prev, newImage]);
  };

  const handleEditImage = (image: IImage) => {
    setSelectedImage(image);
    setIsEditModalOpen(true);
  };

  const handleDeleteImage = (image: IImage) => {
    setSelectedImage(image);
    setIsDeleteModalOpen(true);
  };

  const handleImageUpdate = (updatedImage: IImage) => {
    setImages((prev) => 
      prev.map((img) => 
        img._id === updatedImage._id ? updatedImage : img
      )
    );
    setIsEditModalOpen(false);
    setSelectedImage(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedImage) return;

    try {
      const response = await deleteImage(selectedImage._id);
      if (response.success) {
        setImages((prev) => prev.filter((img) => img._id !== selectedImage._id));
        toast.success(response.message || 'Image deleted successfully');
      } else {
        toast.error(response.message || 'Failed to delete image');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the image');
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Upload New Image
          </button>
          {isOrderChanged && (
            <button
              onClick={handleSaveOrder}
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              Save Order
            </button>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Gallery Images</h2>
          {errors.api && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.api}
            </div>
          )}
          {isLoading && images.length === 0 ? (
            <p className="text-gray-600">Loading images...</p>
          ) : images.length === 0 ? (
            <p className="text-gray-600">No images found. Upload your first image!</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={images.map((image) => image._id)} strategy={horizontalListSortingStrategy}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {images.map((image) => (
                    <SortableImage 
                      key={image._id} 
                      image={image}
                      onEdit={handleEditImage}
                      onDelete={handleDeleteImage}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </main>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleImageUpload}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedImage(null);
        }}
        image={selectedImage}
        onUpdate={handleImageUpdate}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedImage(null);
        }}
        onConfirm={handleConfirmDelete}
        imageName={selectedImage?.title || ''}
      />
    </div>
  );
};

export default HomePage;
