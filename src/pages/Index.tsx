
import React from 'react';
import AudioRemaster from '@/components/AudioRemaster';
import { Music, Guitar, Piano, Drum } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Music Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-10">
          <Guitar className="h-32 w-32 text-purple-300 rotate-12 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 opacity-10">
          <Piano className="h-28 w-28 text-pink-300 -rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-32 left-20 opacity-10">
          <Drum className="h-36 w-36 text-blue-300 rotate-45 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute top-60 left-1/2 transform -translate-x-1/2 opacity-10">
          <Music className="h-24 w-24 text-purple-300 rotate-90 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Guitar className="h-30 w-30 text-pink-300 -rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="absolute top-32 left-1/3 opacity-10">
          <Piano className="h-20 w-20 text-blue-300 rotate-180 animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          {/* Glass effect header container */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full backdrop-blur-sm border border-white/20">
                <Music className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Audio Remaster Pro
              </h1>
              <div className="p-3 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full backdrop-blur-sm border border-white/20">
                <Guitar className="h-8 w-8 text-white" />
              </div>
            </div>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Transform your audio with cutting-edge AI enhancement. Experience crystal-clear sound quality that surpasses industry standards.
            </p>
          </div>
        </div>
        
        {/* Glass container for the main component */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <AudioRemaster />
        </div>
      </div>
    </div>
  );
};

export default Index;
