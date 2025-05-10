import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileImage, AlertCircle } from 'lucide-react';

interface UploadProps {
  file: File | null;
  imageUrl: string | null;
  isLoading: boolean;
  onFileChange: (file: File) => void;
  onPredict: () => void;
  error: string | null;
}

const Upload: React.FC<UploadProps> = ({ 
  file, 
  imageUrl, 
  isLoading, 
  onFileChange, 
  onPredict,
  error
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        onFileChange(droppedFile);
      }
    }
  }, [onFileChange]);
  
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    }
  }, [onFileChange]);

  return (
    <div className="my-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 max-w-2xl text-center"
      >
        <h2 className="mb-4 text-3xl font-bold text-white text-shadow">Upload Brain MRI or X-ray Image</h2>
        <p className="text-lg text-white text-shadow">
          Our advanced  model will analyze your scan and predict if it contains a tumor and its type.
          For accurate results, please upload a clear MRI or X-ray image.
        </p>
      </motion.div>

      <div className="w-full max-w-4xl glass-card p-8">
        <div 
          className={`upload-zone ${
            isDragging 
              ? 'border-primary-500 bg-primary-50/80' 
              : 'border-gray-300 hover:border-primary-400'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
            disabled={isLoading}
          />
          
          {!imageUrl ? (
            <div className="flex flex-col items-center text-center">
              <UploadIcon className="mb-4 h-12 w-12 text-primary-500" />
              <p className="mb-2 text-lg font-medium text-gray-800">Drag and drop your image here</p>
              <p className="text-gray-600">or click to browse files</p>
              <p className="mt-2 text-sm text-gray-500">Supported formats: JPG, PNG</p>
            </div>
          ) : (
            <div className="relative flex w-full flex-col items-center">
              <div className="relative mb-4 h-48 w-full max-w-md overflow-hidden rounded-lg shadow-xl">
                <img 
                  src={imageUrl} 
                  alt="Uploaded scan" 
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-sm text-gray-700">{file?.name}</p>
              <p className="mt-2 text-center text-gray-600">
                Click or drag a new image to replace
              </p>
            </div>
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center rounded-lg bg-error-50 p-4 text-error-800"
          >
            <AlertCircle className="mr-2 h-5 w-5" />
            <span>{error}</span>
          </motion.div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            className="btn-primary flex items-center gap-2"
            onClick={onPredict}
            disabled={!file || isLoading}
          >
            {isLoading ? (
              <>
                <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <FileImage className="h-5 w-5" />
                Analyze Image
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;