import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageDropZone = ({storeFileToUpload, displayImg}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*', 
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles.map((file) => ({
        ...file,
        store: storeFileToUpload(file),
        preview: URL.createObjectURL(file), 
      })));
    },
  });

  const handleDragOver = (e) => {
    e.preventDefault(); // Ensure the dropzone works
    e.currentTarget.classList.add('bg-blue-200', 'scale-[1.02]', 'border-4');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-blue-200', 'scale-[1.02]', 'border-4');
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [uploadedFiles]);

  return (
    <div
      {...getRootProps({
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDragLeave
      })}
      className={`aspect-square min-h-[10rem] flex items-center justify-center bg-blue-50 border-blue-300 border-2 rounded-lg transition-all duration-200 ${!uploadedFiles.length && !displayImg && "p-4"}`}
    >
      <input {...getInputProps()} />
      {!uploadedFiles.length ? !displayImg ? <p>Drag and drop files here or click to browse.</p> : "" :" "}
      <ul className="flex flex-wrap gap-2">
        {uploadedFiles.map((file) => (
          <li key={file.name} className="relative">
            <img src={file.preview} alt={file.name} className="w-full aspect-square object-cover rounded" />
          </li>
        ))}
        {
          displayImg ? !uploadedFiles.length ? 
        (<li className="relative w-full">
            <img src={displayImg} alt={"preview"} className="w-full aspect-square object-cover rounded " />
        </li>) :"":""
        }
      </ul>
    </div>
  );
};

export default ImageDropZone;
