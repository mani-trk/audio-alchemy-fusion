
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileAudio } from 'lucide-react';

interface AudioUploadProps {
  onFileUpload: (file: File) => void;
}

const AudioUpload: React.FC<AudioUploadProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('Files dropped:', acceptedFiles);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.mp4', '.wav', '.flac', '.aac', '.m4a']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024 // 100MB limit
  });

  React.useEffect(() => {
    if (fileRejections.length > 0) {
      console.log('File rejections:', fileRejections);
      fileRejections.forEach(rejection => {
        console.log('Rejected file:', rejection.file.name, 'Errors:', rejection.errors);
      });
    }
  }, [fileRejections]);

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-purple-400 bg-purple-400/10'
          : 'border-slate-600 hover:border-purple-400 hover:bg-purple-400/5'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-purple-600/20 rounded-full">
          {isDragActive ? (
            <Upload className="h-8 w-8 text-purple-400 animate-bounce" />
          ) : (
            <FileAudio className="h-8 w-8 text-purple-400" />
          )}
        </div>
        <div className="text-white">
          <p className="text-lg font-medium">
            {isDragActive ? 'Drop your audio file here' : 'Upload Audio File'}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Drag & drop or click to select (MP3, MP4, WAV, FLAC, AAC, M4A)
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Maximum file size: 100MB
          </p>
        </div>
      </div>
      {fileRejections.length > 0 && (
        <div className="mt-4 p-3 bg-red-600/20 border border-red-600/30 rounded-lg">
          <p className="text-red-400 text-sm">
            File upload failed. Please check file format and size.
          </p>
        </div>
      )}
    </div>
  );
};

export default AudioUpload;
