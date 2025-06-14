
import React from 'react';
import AudioRemaster from '@/components/AudioRemaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Audio Remaster Pro
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your audio with cutting-edge AI enhancement. Experience crystal-clear sound quality that surpasses industry standards.
          </p>
        </div>
        <AudioRemaster />
      </div>
    </div>
  );
};

export default Index;
