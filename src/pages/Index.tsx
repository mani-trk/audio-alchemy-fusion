
import React from 'react';
import AudioRemaster from '@/components/AudioRemaster';
import { Music, Guitar, Piano, Drum, Headphones, Waves } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-5">
          <Guitar className="h-32 w-32 text-blue-400 rotate-12 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 opacity-5">
          <Piano className="h-28 w-28 text-purple-400 -rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-32 left-20 opacity-5">
          <Drum className="h-36 w-36 text-indigo-400 rotate-45 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute top-60 left-1/2 transform -translate-x-1/2 opacity-5">
          <Music className="h-24 w-24 text-cyan-400 rotate-90 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-5">
          <Headphones className="h-30 w-30 text-violet-400 -rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="absolute top-32 left-1/3 opacity-5">
          <Waves className="h-20 w-20 text-teal-400 rotate-180 animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
      </div>

      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-blue-500/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-indigo-500/10 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-16">
          {/* Header Section */}
          <div className="bg-slate-900/80 border border-slate-700/50 rounded-3xl p-12 mb-12 shadow-2xl backdrop-blur-sm">
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                <Music className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                AudioZen Remaster Pro
              </h1>
              <div className="p-4 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg">
                <Guitar className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-3xl text-slate-200 max-w-4xl mx-auto leading-relaxed font-light mb-4">
                Transform your audio with cutting-edge AI enhancement
              </p>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Experience crystal-clear sound quality that surpasses industry standards
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-slate-800/60 border border-slate-600/50 rounded-2xl p-8 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                    <Waves className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">AI Enhancement</h3>
                <p className="text-slate-300">Advanced algorithms for superior audio quality</p>
              </div>
              
              <div className="bg-slate-800/60 border border-slate-600/50 rounded-2xl p-8 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
                    <Headphones className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">Studio Quality</h3>
                <p className="text-slate-300">Professional-grade audio processing</p>
              </div>
              
              <div className="bg-slate-800/60 border border-slate-600/50 rounded-2xl p-8 hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                    <Music className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">Multiple Formats</h3>
                <p className="text-slate-300">Support for MP3, MP4, WAV, FLAC & more</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Application Container */}
        <div className="bg-slate-900/90 border border-slate-700/50 rounded-3xl p-12 shadow-2xl backdrop-blur-sm">
          <AudioRemaster />
        </div>
      </div>
    </div>
  );
};

export default Index;
