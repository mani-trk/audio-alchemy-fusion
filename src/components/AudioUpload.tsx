
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileAudio } from 'lucide-react';

interface AudioUploadProps {
  onFileUpload: (file: File) => void;
}

const AudioUpload: React.FC<AudioUploadProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.mp4', '.wav', '.flac', '.aac', '.m4a']
    },
    maxFiles: 1
  });

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
        </div>
      </div>
    </div>
  );
};

export default AudioUpload;
